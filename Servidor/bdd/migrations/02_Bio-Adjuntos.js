exports.up = function (knex, Promise) {
    return knex.schema.createTable('Bio-Adjuntos', function (table) {
        table.increments('idAdjuntos').unsigned().primary();
        table.string('nombre').notNullable();
        table.string('descripcion').notNullable();
        table.string('tipo').notNullable();
        table.longtext('contenido').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Bio-Adjuntos');
};
