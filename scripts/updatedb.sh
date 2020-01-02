#!/bin/sh

make download
make db/dropschema/raw

touch sql/raw/contacts.sql
make load/public