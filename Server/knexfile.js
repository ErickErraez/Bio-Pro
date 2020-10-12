;
//cadena de conexion a la base de datos
const databaseData = {
    client: process.env.CLIENT || 'mysql',
    connection: process.env.CONNECTION_DB || {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '12345678',
        database: 'bio_pro'
    }
};
//configurar knex
module.exports = {
    development: {
        migrations: {tableName: 'knex_migrations', directory: './database/migrations'},
        seeds: {directory: './database/seeds'},
        client: databaseData.client,
        connection: databaseData.connection

    },
};
