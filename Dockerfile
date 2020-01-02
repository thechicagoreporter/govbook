FROM hasura/graphql-engine:v1.0.0 as base
FROM python:3.7-slim-buster

RUN apt-get update -qq \
    && apt-get install -y --no-install-recommends build-essential cargo curl libpq-dev postgresql-client

# Copy hausra binary from base container
COPY --from=base /bin/graphql-engine /bin/graphql-engine

WORKDIR /govbook/

# Install Python environment
# COPY requirements.txt requirements.txt
# RUN pip install -r /govbook/requirements.txt

# Install ETL / processing
COPY Makefile Makefile
ADD data/ data/
ADD sql/ sql/
ADD scripts/ scripts/

# Install xsv
RUN cargo install xsv

# Add xsv binary to PATH
ENV PATH="/root/.cargo/bin/:${PATH}"

# The makefile requires a dot env file
RUN touch .env

# Run Hasura
CMD graphql-engine \
    --database-url $DATABASE_URL \
    serve \
    --server-port $PORT