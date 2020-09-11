
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Bio-Timbradas', function (table) {
        table.increments('idTimbradas').unsigned().primary();
        table.string('fecha', 50).notNullable();
        table.string('entrada', 50).notNullable();
        table.string('almuerzo', 50).notNullable().unique();
        table.string('regresoAlmuerzo', 50).notNullable().unique();
        table.string('salida', 50).notNullable().unique();
        table.integer('usuario').unsigned().references('idUsuarios').inTable('Bio-Usuarios');
        table.integer('justificacion').unsigned().references('idAdjuntos').inTable('Bio-Adjuntos');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Bio-Timbradas');
  
};
