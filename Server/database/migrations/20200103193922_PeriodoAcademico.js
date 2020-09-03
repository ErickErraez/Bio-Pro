
exports.up = function(knex, Promise) {
    return knex.schema.createTable('PeriodoAcademico', function (table) {
        table.increments('idPeriodoAcademico').unsigned().primary();
        table.string('nombre',50).notNullable();
        table.string('estado',50).notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('PeriodoAcademico');
};
