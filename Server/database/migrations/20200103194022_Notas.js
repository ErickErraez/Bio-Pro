exports.up = function (knex, Promise) {
    return knex.schema.createTable('Notas', function (table) {
        table.increments('idNotas').unsigned().primary();
        table.dateTime('fechaLimite');
        table.dateTime('fechaEntrega');
        table.integer('nota');
        table.string('calificador', 100);
        table.integer('idTipoEvaluacion').unsigned().references('idTipoEvaluaciones').inTable('TipoEvaluaciones');
        table.integer('idUsuariosProyectos').unsigned().references('idUsuariosProyectos').inTable('UsuariosProyectos');
        table.string('observaciones', 250);
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Notas');
};
