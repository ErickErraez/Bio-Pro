const bookshelf = require('../../bookshelf');

var Adjunto,
    Adjuntos;

Adjunto = bookshelf.Model.extend({
    tableName: 'Bio-Adjuntos',
    idAttribute: 'idAdjuntos',
});

Adjuntos = bookshelf.Collection.extend({
    model: Adjunto
});

module.exports = {
    Adjunto: bookshelf.model('Adjunto', Adjunto),
    Adjuntos: bookshelf.collection('Adjuntos', Adjuntos)
};
