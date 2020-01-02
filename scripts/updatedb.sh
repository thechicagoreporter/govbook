#!/bin/sh

touch sql/raw/contacts.sql
make download
make db/dropschema/raw
make load/public