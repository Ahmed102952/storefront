# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend. 

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 
## Installation Instructions

`npm install` : to install packages 

## Scripts

-   `lint:fix`: to run eslint with prettier.
-   `build`: to compile ts to js
-   `start`: to start the server
-   `test`: to migrate testing database and start test with jasmine. `test:win` for windows

## Set up Database
### Create Databases
Create the dev and test database on port `5432`.

- In psql run the following to create a user 
    - `CREATE USER angelic_user WITH PASSWORD 'ang123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefron;`
    - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c storefront`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront TO angelic_user;`
    - Grant for test database
        - `\c storefront_test`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO angelic_user;`

### Migrate Database

run in root dir `npm run db-up` to migrate database

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. 

```
user=angelic_user
password=ang123
port=5432
database=storefront
database_test=storefront_test

bycrpt_password=wanna_dive_in_pool
salt_rounds=12

token_secret=wanna_be_under_water
test_token=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiZmlyc3QtbmFtZSIsImxhc3RfbmFtZSI6Imxhc3QtbmFtZSJ9.i1nkMaoXoex6aPWz7wSghgCsZCdJ3mAPwc7_ghHhqRM

ENV=dev
```

## Start App

run `npm run start`: to start the server on port `3000` and database should be on port `5432`