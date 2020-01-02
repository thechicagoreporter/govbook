FROM hasura/graphql-engine:v1.0.0 as base
FROM python:3.7-slim-buster

RUN apt-get -y update \
    && apt-get install -y --no-install-recommends build-essential cargo curl libpq-dev postgresql-client \
    && pip install pipenv

# Copy hausra binary from base container
COPY --from=base /bin/graphql-engine /bin/graphql-engine

RUN mkdir /govbook
WORKDIR /govbook

# Install Python environment
COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock
RUN pipenv install --deploy --ignore-pipfile --system

ADD . /govbook
RUN pip install .

# Install ETL / processing
COPY Makefile Makefile
ADD data/ data/
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