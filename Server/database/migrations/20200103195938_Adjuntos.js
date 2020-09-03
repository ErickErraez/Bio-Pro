exports.up = function (knex, Promise) {
    return knex.schema.createTable('Adjuntos', function (table) {
        table.increments('idAdjuntos').unsigned().primary();
        table.string('nombre').notNullable();
        table.string('tipo').notNullable();
        table.text('contenido').notNullable();
        table.integer('idNotas').unsigned().references('idNotas').inTable('Notas');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Adjuntos');
};
