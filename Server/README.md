# TriHard-Reservations Server

Installation
```bash
npm install
```
or
```bash
yarn install
```
## To Run
```bash
npm run start
```
With Nodemon
```bash
npm run nodemon
```
### Create role
```bash
CREATE USER invetario_user PASSWORD '123456';
ALTER ROLE invetario_user WITH SUPERUSER;
ALTER ROLE invetario_user WITH LOGIN;
```
### Create Database 
```bash
CREATE DATABASE "invetario_db"
    WITH 
    OWNER = invetario_user
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```
### Create Schemas
```
   CREATE SCHEMA IF NOT EXISTS access AUTHORIZATION invetario_user;
   CREATE SCHEMA IF NOT EXISTS corporations AUTHORIZATION invetario_user;
   CREATE SCHEMA IF NOT EXISTS persons AUTHORIZATION invetario_user;
   CREATE SCHEMA IF NOT EXISTS processes AUTHORIZATION invetario_user;
   CREATE SCHEMA IF NOT EXISTS catalogs AUTHORIZATION invetario_user;
```
### Migrate the tables
```
 knex migrate:latest
```


### Add records in the tables #Dates testing
```bash
knex seed:run
```






