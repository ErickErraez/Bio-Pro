const bookshelf = require('../../bookshelf');
const Nota = require('./Notas').Nota;

var Adjunto,
    Adjuntos;

Adjunto = bookshelf.Model.extend({
    tableName: 'Adjuntos',
    idAttribute: 'idAdjuntos',
    nota: function () {
        return this.hasOne(Nota, 'idNotas')
    }
});

Adjuntos = bookshelf.Collection.extend({
    model: Adjunto
});

module.exports = {
    Adjunto: bookshelf.model('Adjunto', Adjunto),
    Adjuntos: bookshelf.collection('Adjuntos', Adjuntos)
};
