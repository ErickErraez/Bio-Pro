                                              
exports.up = function(knex, Promise) {
    return knex.schema.createTable('UsuariosProyectos', function (table) {
        table.increments('idUsuariosProyectos').unsigned().primary();
        table.integer('idEstudiante').unsigned().references('idUsuarios').inTable('Usuarios');
        table.integer('idProyecto').unsigned().references('idProyectos').inTable('Proyectos');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('UsuariosProyectos');
};
