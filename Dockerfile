FROM hasura/graphql-engine:v1.0.0 as base
FROM python:3.7-slim-buster

WORKDIR $HOME/govbook/

RUN apt-get -y update \
    && apt-get install -y --no-install-recommends build-essential cargo curl libpq-dev postgresql \
    && pip install pipenv

# Copy the whole govbook directory
COPY ./ $HOME/govbook/

# copy hausra binary from base container
COPY --from=base /bin/graphql-engine /bin/graphql-engine

RUN pipenv install \
    && cargo install xsv

# RUN pipenv install
RUN touch .env

# Add xsv binary to PATH
ENV PATH="/root/.cargo/bin/:${PATH}"

# Change $DATABASE_URL to your heroku postgres URL if you're not using
# the primary postgres instance in your app
CMD graphql-engine \
    --database-url $DATABASE_URL \
    serve \
    --server-port $PORT