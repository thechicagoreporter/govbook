################################################################################
#
# Process data related to disappearances in Mexico.
#
# Run make help to see all commands.
#
# make all will build the site.
#
# This is an auto-documenting Makefile:
#
# Add sections to help with a line like:
#
#  ##@ Section Name
#
# Add commands by following a target line with a double-# comment
# like this:
#
#  clean: ## Delete all files".
#
################################################################################

# Include .env configuration
include .env
export

DOWNLOAD_DIRECTORIES = downloads
PROCESSED_DIRECTORIES = processed

##@ Basic usage

.DEFAULT_GOAL := help

.PHONY: all
all: static/contacts.csv ## Build all

.PHONY: deploy
deploy: clean/public clean/cache public ## Deploy site from public directory
	aws s3 sync public s3://${BUCKET}/${SLUG} --acl public-read

.PHONY: teardown
teardown: ## Teardown active site; use with extreme care, very slow
	aws s3 rm s3://${BUCKET}/${SLUG} --recursive

public: all ## Build site in public directory
	gatsby build

.PHONY: clean
clean: clean/processed clean/cache clean/public clean/static ## Clean processed data, cache, and builds.

.PHONY: help
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z\%\\.\/_-]+:.*?##/ { printf "\033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Source data

.PHONY: download
download: data/downloads/contacts.csv ## Download contacts

data/downloads/contacts.csv: # Download contacts
	curl -o $@ https://illinoiscomptroller.gov/financial-data/local-government-division/view-local-government-contact-information/download-csv/

##@ Processed data

data/processed/contacts.sqlite: data/downloads/contacts.csv
	(echo .separator ,; echo .import $(CURDIR)/$< contacts) | sqlite3 $@

static/contacts.csv: data/processed/contacts.sqlite
	(echo .headers on; echo .mode csv; echo "select * from contacts;") | sqlite3 $< > $@

##@ Utilities

.PHONY: dbshell
dbshell:
	sqlite3 data/processed/*.sqlite

.PHONY: install
install: install/npm install ## Install project dependencies

.PHONY: install/npm
install/npm: # Install from NPM
	npm install

.PHONY: clean/processed
clean/processed: $(patsubst %, rm/%, $(PROCESSED_DIRECTORIES)) ## Remove processed files

.PHONY: clean/downloads
clean/downloads: $(patsubst %, rm/%, $(DOWNLOAD_DIRECTORIES)) ## Remove processed files

.PHONY: clean/cache
clean/cache:
	rm -rf .cache/

.PHONY: clean/public
clean/public:
	rm -rf public/

.PHONY: clean/static
clean/static: clean/static/contacts.csv ## Make static data files

.PHONY: clean/static/contacts.csv
clean/static/contacts.csv:
	rm -rf static/contacts.csv

.PHONY: rm/%
rm/%: ## Remove data/% where % is a directory name
	rm -rf data/$*/*
