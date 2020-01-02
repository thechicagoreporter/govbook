###############################################################################
#
# ILLINOIS STATE BOARD OF ELECTION CAMPAIGN FINANCE LOADER
#
# Run `make help` to see commands.
# 
# You must have a .env file with:
#
# 	ILCAMPAIGNCASH_FTP_USER=<your-ftp-user>
# 	ILCAMPAIGNCASH_FTP_PASSWORD=<your-ftp-password>
# 	PGHOST=<your-pghost>
# 	PGPORT=<your-pgport>
# 	PGDATABASE=<your-database-name>
# 	PGUSER=<your-db-user>
# 	PGPASSWORD=<your-db-password>
#
###############################################################################

# Include .env configuration
include .env
export

# Contact data source URL
CONTACT_URL = https://illinoiscomptroller.gov/financial-data/local-government-division/view-local-government-contact-information/download-csv/

# Activate Python environment
PIPENV = pipenv run

# Schemas
SCHEMAS = raw public

# Source tables
RAW_TABLES = contacts 

# Views
PUBLIC_TABLES = $(basename $(notdir $(wildcard sql/public/*.sql)))


##@ Basic usage

.PHONY: all
all: load/public ## Build database

.PHONY: download
download: $(patsubst %, data/downloads/%.csv, $(RAW_TABLES)) ## Download source data

.PHONY: process
process: $(patsubst %, data/processed/%.csv, $(RAW_TABLES)) ## Minimally process source data for import

.PHONY: load/raw
load/raw: $(patsubst %, db/raw/%, $(RAW_TABLES)) ## Load raw data

.PHONY: load/public 
load/public: $(patsubst %, db/public/%, $(PUBLIC_TABLES)) ## Load public / processed data

.PHONY: help
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z\%\\.\/_-]+:.*?##/ { printf "\033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)


##@ Database structure

define create_raw_table
	@(psql -c "\d raw.$(subst db/raw_table/,,$@)" > /dev/null 2>&1 && \
		echo "table raw.$(subst db/raw_table/,,$@) exists") || \
	psql -v ON_ERROR_STOP=1 -qX1ef $<
endef

define create_schema
	@(psql -c "\dn $(subst db/schemas/,,$@)" | grep $(subst db/schemas/,,$@) > /dev/null 2>&1 && \
	  echo "schema $(subst db/schemas/,,$@) exists") || \
	psql -v ON_ERROR_STOP=1 -qaX1ec "CREATE SCHEMA $(subst db/schemas/,,$@)"
endef

define load_raw_csv
	@(psql -Atc "select count(*) from raw.$(subst db/raw/,,$@)" | grep -v -w "0" > /dev/null 2>&1 && \
	 	echo "raw.$(subst db/raw/,,$@) is not empty") || \
	psql -v ON_ERROR_STOP=1 -qX1ec "\copy raw.$(subst db/raw/,,$@) from '$(CURDIR)/$<' with delimiter ',' csv header;"
endef

define load_public_table
	@psql -v ON_ERROR_STOP=1 -qX1ef sql/public/$(subst db/public,,$@).sql
endef

.PHONY: db
db: ## Create database
	@(psql -c "SELECT 1" > /dev/null 2>&1 && \
		echo "database $(PGDATABASE) exists") || \
	createdb -e $(PGDATABASE) -E UTF8 -T template0 --locale=en_US.UTF-8

.PHONY: db/vacuum
db/vacuum: # Vacuum db
	psql -v ON_ERROR_STOP=1 -qec "VACUUM ANALYZE;"

.PHONY: db/schemas
db/schemas: $(patsubst %, db/schemas/%, $(SCHEMAS)) # Make all schemas

.PHONY: db/schemas/%
db/schemas/%: db # Create schema % (where % is 'raw', etc)
	$(call create_schema)

.PHONY: db/raw_table/%
db/raw_table/%: sql/raw/%.sql db/schemas/raw # Create table % from sql/tables/%.sql
	$(call create_raw_table)

.PHONY: dropdb
dropdb: ## Drop database
	dropdb --if-exists -e $(PGDATABASE)

##@ Data management

.PHONY: db/raw/%
db/raw/%: data/processed/%.csv db/raw_table/% ## Load raw data into raw.% from data/downloads/%.csv
	$(call load_raw_csv)

.PHONY: db/public/%
db/public/%: load/raw db/schemas/public ## Update % from raw data
	$(call load_public_table)

.PHONY: db/dropschema/%
db/dropschema/%: ## Drop a schema (e.g. public); allows recreating database in stages
	psql -v ON_ERROR_STOP=1 -qX1c "DROP SCHEMA IF EXISTS $* CASCADE;"


##@ Data processing

data/downloads/contacts.csv: ## Download contacts CSV
	curl -o $@ $(CONTACT_URL) 

.PRECIOUS: sql/raw/%.sql
sql/raw/%.sql: data/stats/%.csv ## Generate SQL table schema
	$(PIPENV) python processors/schema.py $< $@

data/processed/%.csv: data/downloads/%.csv ## Fix busted CSVs with XSV
	xsv fixlengths $< > $@

.PRECIOUS: data/stats/%.csv
data/stats/%.csv: data/processed/%.csv # Get CSV stats
	xsv stats $< > $@


##@ Heroku

.PHONY: heroku/config/set
heroku/config/set: ## Copy .env to Heroku variables
	heroku config:set $(shell grep "^[^#;]" .env | tr '\n' ' ')


##@ Maintenance

.PHONY: dbshell
dbshell: db ## Run a database shell
	psql

.PHONY: install
install: install/npm install/pipenv ## Install dependencies

.PHONY: install/npm
install/npm:
	npm install

.PHONY: install/pipenv
install/pipenv:
	pipenv install

.PHONY: clean
clean: clean/processed clean/download  ## Delete downloads and processed data files

.PHONY: clean/%
clean/%:  ## Clean data/%
	rm -f data/$*/*