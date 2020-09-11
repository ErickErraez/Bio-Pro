
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Bio-Roles', function (table) {
        table.increments('idRoles').unsigned().primary();
        table.string('descripcion',20).notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Bio-Roles');
};
