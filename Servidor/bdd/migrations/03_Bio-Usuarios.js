exports.up = function (knex, Promise) {
    return knex.schema.createTable('Bio-Usuarios', function (table) {
        table.increments('idUsuarios').unsigned().primary();
        table.string('cedula', 50).notNullable().unique();
        table.string('nombre', 150).notNullable();
        table.string('correo', 100).notNullable().unique();
        table.string('password');
        table.string('newpassword');
        table.integer('rol').unsigned().references('idRoles').inTable('Bio-Roles');
        table.integer('foto').unsigned().references('idAdjuntos').inTable('Bio-Adjuntos');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Bio-Usuarios');
};
