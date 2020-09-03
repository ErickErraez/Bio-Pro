exports.up = function (knex, Promise) {
    return knex.schema.createTable('Roles', function (table) {
        table.increments('idRoles').unsigned().primary();
        table.string('nombre',20).notNullable();
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Roles');
};
