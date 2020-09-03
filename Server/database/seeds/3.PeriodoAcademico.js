exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('PeriodoAcademico').del().then(function () {
        // Inserts seed entries
        return knex('PeriodoAcademico').insert([
            {nombre: 'NOVIEMBRE 2019 - ABRIL 2020', estado: 'Activo'},
        ]);
    });
};
