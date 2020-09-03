exports.up = function (knex, Promise) {
    return knex.schema.createTable('Usuarios', function (table) {
        table.increments('idUsuarios').unsigned().primary();
        table.string('nombre1', 50).notNullable();
        table.string('apellido1', 50).notNullable();
        table.string('cedula', 10).notNullable();
        table.string('correo', 50).notNullable().unique();
        table.string('password');
        table.string('nivel', 10);
        table.integer('rol').unsigned().references('idRoles').inTable('Roles');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Usuarios');
};
