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

CLEAN_DIRECTORIES = downloads processed

##@ Basic usage

.DEFAULT_GOAL := all
.PHONY: all
all: data/processed/contacts.sqlite ## Build all

.PHONY: clean
clean: clean/data clean/caches ## Clean downloads, exports, and caches

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

##@ Utilities

.PHONY: dbshell
dbshell:
	sqlite3 data/processed/*.sqlite

.PHONY: install
install: install/npm install ## Install project dependencies

.PHONY: install/npm
install/npm: # Install from NPM
	npm install

.PHONY: clean/data
clean/data: $(patsubst %, rm/%, $(CLEAN_DIRECTORIES)) ## Remove all downloads

.PHONY: clean/caches
clean/caches:
	rm -rf .cache/

.PHONY: rm/%
rm/%: ## Remove data/% where % is a directory name
	rm -rf data/$*/*
