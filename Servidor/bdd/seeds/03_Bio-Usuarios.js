
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Bio-Usuarios').del()
    .then(function () {
      // Inserts seed entries
      return knex('Bio-Usuarios').insert([
          {nombre: 'ERICK DANIEL',apellido:'ERRAEZ GUAMAN',correo: 'erickerraez2@gmail.com',password:'$2b$10$ZaAHm3FBO2nY7K9kORnGq.vEHdRmzlmN53eB1a3sXzUMv6DQBTxNu',rol:1,foto:1},
          {nombre: 'ALEJANDRO DANIEL',apellido:'CORONEL FABARA',correo: 'adf.coronel@yavirac.edu.ec',password:'$2b$10$ZaAHm3FBO2nY7K9kORnGq.vEHdRmzlmN53eB1a3sXzUMv6DQBTxNu',rol:2},
      ]);
    });
};
