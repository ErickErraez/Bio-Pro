exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('Bio-Roles').del()
        .then(function () {
            // Inserts seed entries
            return knex('Bio-Roles').insert([
                {idRoles:1,descripcion: 'SUPERADMINISTRADOR'},
                {idRoles:2,descripcion: 'ADMINISTRADOR'},
                {idRoles:3,descripcion: 'USUARIO'},
            ]);
        });
};
