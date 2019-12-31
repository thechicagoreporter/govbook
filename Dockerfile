FROM hasura/graphql-engine:v1.0.0 as base

FROM python:3.7-slim-buster

RUN apt-get -y update \
    && apt-get install -y --no-install-recommends build-essential cargo curl libpq-dev \
    && cargo install xsv \
    && pip install pipenv

COPY ./* $HOME/govbook/

WORKDIR $HOME/govbook/

RUN pipenv install
RUN touch .env

# copy hausra binary from base container
COPY --from=base /bin/graphql-engine /bin/graphql-engine

# Enable the console
ENV HASURA_GRAPHQL_ENABLE_CONSOLE=true

# Change $DATABASE_URL to your heroku postgres URL if you're not using
# the primary postgres instance in your app
CMD graphql-engine \
    --database-url $DATABASE_URL \
    serve \
    --server-port $PORT

## Comment the command above and use the command below to
## enable an access-key and an auth-hook
## Recommended that you set the access-key as a environment variable in heroku
#CMD graphql-engine \
#    --database-url $DATABASE_URL \
#    serve \
#    --server-port $PORT \
#    --access-key XXXXX \
#    --auth-hook https://myapp.com/hasura-webhook 
#
# Console can be enable/disabled by the env var HASURA_GRAPHQL_ENABLE_CONSOLE
