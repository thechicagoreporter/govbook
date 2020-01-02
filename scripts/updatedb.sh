#!/bin/sh

make sql/raw/contacts.sql > /dev/null
touch sql/raw/contacts.sql

make download
make db/dropschema/raw
make load/public