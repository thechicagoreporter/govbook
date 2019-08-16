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

##@ Basic usage

.DEFAULT_GOAL := all
.PHONY: all
all: data/processed/contacts.csv ## Build all

.PHONY: clean
clean: clean/downloads clean/caches ## Clean downloads and caches

.PHONY: help
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z\%\\.\/_-]+:.*?##/ { printf "\033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Source data

.PHONY: download
download: data/downloads/contacts.csv ## Download contacts

data/downloads/contacts.csv: # Download contacts
	curl -o $@ https://illinoiscomptroller.gov/financial-data/local-government-division/view-local-government-contact-information/download-csv/

data/processed/contacts.csv: data/downloads/contacts.csv # Process (sort) contacts
	xsv sort -s County,City,UnitName $< > $@

##@ Utilities

.PHONY: develop
develop: all  ## Run development server
	npm develop

.PHONY: install
install: install/npm install ## Install project dependencies

.PHONY: install/npm
install/npm: # Install from NPM
	npm install

.PHONY: clean/downloads
clean/downloads: $(patsubst %, rm/%, $(DOWNLOAD_DIRECTORIES)) ## Remove all downloads

.PHONY: clean/caches
clean/caches:
	rm -rf .cache/

.PHONY: rm/%
rm/%: ## Remove data/% where % is a directory name
	rm -rf data/$*/*
