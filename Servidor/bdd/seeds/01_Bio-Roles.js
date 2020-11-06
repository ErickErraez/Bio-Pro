exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('Bio-Roles').del()
        .then(function () {
            // Inserts seed entries
            return knex('Bio-Roles').insert([
                {descripcion: 'SUPERADMINISTRADOR'},
                {descripcion: 'ADMINISTRADOR'},
                {descripcion: 'USUARIO'},
            ]);
        });
};
