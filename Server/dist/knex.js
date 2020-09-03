"use strict";
//base de datos
const database = {
    client: process.env.CLIENT || 'mysql',
    connection: process.env.CONNECTION_DB || {
        host: '127.0.0.1',
        user: 'root',
        password: '123456789',
        database: 'world',
        charset: 'utf8'
    }
};
//configurar knex
module.exports = {
    development: {
        migrations: { tableName: 'knex_migrations', directory: './database/migrations' },
        seeds: { directory: './database/seeds' },
        client: database.client,
        connection: database.connection
    },
};
