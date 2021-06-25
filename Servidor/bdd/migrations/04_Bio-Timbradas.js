
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Bio-Timbradas', function (table) {
        table.increments('idTimbradas').unsigned().primary();
        table.date('fecha').notNullable();
        table.time('entrada');
        table.time('almuerzo');
        table.time('regresoAlmuerzo');
        table.time('salida');
        table.integer('usuario').unsigned().references('idBio').inTable('Bio-Usuarios');
        table.integer('justificacion').unsigned().references('idAdjuntos').inTable('Bio-Adjuntos');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Bio-Timbradas');
  
};
