exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('TipoEvaluaciones').del()
        .then(function () {
            // Inserts seed entries
            return knex('TipoEvaluaciones').insert([
                {idTipoEvaluaciones: 1, tipo: 'Entregable 1'},
                {idTipoEvaluaciones: 2,tipo: 'Entregable 2'},
                {idTipoEvaluaciones: 3,tipo: 'Defensa 1'},
                {idTipoEvaluaciones: 4,tipo: 'Defensa 2'},
                {idTipoEvaluaciones: 5,tipo: 'Nota Final'}
            ]);
        });
};
