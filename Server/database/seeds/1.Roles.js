exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('Roles').del()
        .then(function () {
            // Inserts seed entries
            return knex('Roles').insert([
                {idRoles: 1, nombre: 'Administrador'},
                {idRoles: 2, nombre: 'Estudiante'},
                {idRoles: 3, nombre: 'Tutor'},
                {idRoles: 4, nombre: 'Jurado'}
            ]);
        });
};
