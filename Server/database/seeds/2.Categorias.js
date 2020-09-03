
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Categorias').del()
    .then(function () {
      // Inserts seed entries
      return knex('Categorias').insert([
        {nombre: 'Medio Ambiente'},
        {nombre: 'Proyecto con Empresa'},
        {nombre: 'Proyectos Ignug'}
      ]);
    });
};
