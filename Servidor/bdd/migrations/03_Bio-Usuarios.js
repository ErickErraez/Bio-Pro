exports.up = function (knex, Promise) {
    return knex.schema.createTable('Bio-Usuarios', function (table) {
        table.increments('idUsuarios').unsigned().primary();
        table.string('nombre', 50).notNullable();
        table.string('apellido', 50).notNullable();
        table.string('correo', 50).notNullable().unique();
        table.string('password');
        table.integer('rol').unsigned().references('idRoles').inTable('Bio-Roles');
        table.integer('foto').unsigned().references('idAdjuntos').inTable('Bio-Adjuntos');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Bio-Usuarios');
};
