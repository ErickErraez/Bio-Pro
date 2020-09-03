exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('Configuraciones').del()
        .then(function () {
            // Inserts seed entries
            return knex('Configuraciones').insert([
                {formularioSolicitud: true},
            ]);
        });
};
