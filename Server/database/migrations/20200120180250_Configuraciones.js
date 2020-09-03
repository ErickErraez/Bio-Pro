exports.up = function (knex, Promise) {
    return knex.schema.createTable('Configuraciones', function (table) {
        table.increments('idConfiguraciones').unsigned().primary();
        table.boolean('formularioSolicitud').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Configuraciones');
};
