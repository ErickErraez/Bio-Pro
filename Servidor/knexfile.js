;
//cadena de conexion a la base de datos
// const databaseData = {
//     client: process.env.CLIENT || 'mysql',
//     connection: process.env.CONNECTION_DB || {
//         host: 'us-cdbr-east-03.cleardb.com',
//         port: '3306',
//         user: 'bb3cc2f541035c',
//         password: 'a9fc0eec',
//         database: 'heroku_8501be7510fa9e0'
//     }
// };
// //configurar knex
// module.exports = {
//     development: {
//         migrations: {tableName: 'knex_migrations', directory: './bdd/migrations'},
//         seeds: {directory: './bdd/seeds'},
//         client: databaseData.client,
//         connection: databaseData.connection
//
//     },
// };
const databaseData = {
    client: process.env.CLIENT || 'mysql',
    connection: process.env.CONNECTION_DB || {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '12345678',
        database: 'Bio_Pro'
    }
};
//configurar knex
module.exports = {
    development: {
        migrations: {tableName: 'knex_migrations', directory: './bdd/migrations'},
        seeds: {directory: './bdd/seeds'},
        client: databaseData.client,
        connection: databaseData.connection

    },
};
