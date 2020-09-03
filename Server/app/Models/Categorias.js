const bookshelf = require('../../bookshelf');

var Categoria,
    Categorias;

Categoria = bookshelf.Model.extend({
    tableName: 'Categorias',
    idAttribute: 'idCategorias'
});

Categorias = bookshelf.Collection.extend({
    model: Categoria
});

module.exports = {
    Categoria: bookshelf.model('Categoria', Categoria),
    Categorias: bookshelf.collection('Categorias', Categorias)
};
