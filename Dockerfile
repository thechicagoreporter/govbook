FROM hasura/graphql-engine:v1.0.0 as base
FROM python:3.7-slim-buster

RUN apt-get -y update \
    && apt-get install -y --no-install-recommends build-essential cargo curl libpq-dev postgresql-client \
    && pip install pipenv

# Copy hausra binary from base container
COPY --from=base /bin/graphql-engine /bin/graphql-engine

WORKDIR /govbook/

# Install Python environment
COPY requirements.txt requirements.txt
RUN pip install -r /govbook/requirements.txt

# Install ETL / processing
COPY Makefile Makefile
COPY data/processed/contacts.csv data/processed/contacts.csv
COPY data/stats/contacts.csv data/stats/contacts.csv
ADD processors/ processors/
ADD sql/ sql/

# Install xsv

# @TODO restore

# Add xsv binary to PATH
# ENV PATH="/root/.cargo/bin/:${PATH}"

RUN touch .env

# Change $DATABASE_URL to your heroku postgres URL if you're not using
# the primary postgres instance in your app
CMD graphql-engine \
    --database-url $DATABASE_URL \
    serve \
    --server-port $PORT