exports.seed = function (knex, Promise) {
    return knex('Usuarios').del()
        .then(function () {
            // Inserts seed entries
            return knex('Usuarios').insert([
                {nombre1: 'MAURICIO', apellido1: 'TAMAYO', cedula: '1710623024', correo: 'ctamayo@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                {nombre1: 'PABLO', apellido1: 'ROBAYO', cedula: '1710623025', correo: 'probayo@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                {nombre1: 'YOGLEDIS', apellido1: 'HERRERA', cedula: '1710623026', correo: 'yherrera@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                {nombre1: 'ERICK', apellido1: 'ERRAEZ', cedula: '1725875296', correo: 'edg.erraez@yavirac.edu.ec', password: '$10$Zvxm/GiEyNEJu2ZyolQol.aeqSPdHHyS5gg4NA4wJAcNWef6zIqr2', nivel: '5', rol: 3},
                {nombre1: 'FANNY', apellido1: 'MAYORGA', cedula: '1726679093', correo: 'fes.mayorga@yavirac.edu.ec', password: '$2b$10$7RMTqDlZn5KRZqorB5CDM.735bYUnhTa0vOX3lN88KGZu4Z11m6oe', nivel: '5', rol: 1},
                {nombre1: 'RODRIGO', apellido1: 'DIAZ', cedula: '1726918939', correo: 'raa.diaz@yavirac.edu.ec', password: '$2b$10$yLtAr4slBJkjV//GiXUv7u6JEkvvaENzOejWO.BQJr1o6Vc1ujABW', nivel: '5', rol: 2},
                {nombre1: 'ALEJANDRO', apellido1: 'CORONEL', cedula: '1751031442', correo: 'adf.coronel@yavirac.edu.ec', password: '$2b$10$BLYPBUkowhrHPn0se1znAOsE5DU3Hu0UT/ipn0LwpZUNY97YAY0Vq', nivel: '5', rol: 2},
            ]);
        });
};
