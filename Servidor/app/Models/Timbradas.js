const bookshelf = require('../../bookshelf');
const Usuario = require('./Usuarios').User;
const Justificacion = require('./Adjunto').Adjunto;

var Timbrada,
    Timbradas;

Timbrada = bookshelf.Model.extend({
    tableName: 'Bio-Timbradas',
    idAttribute: 'idTimbradas',

    usuario: function () {
        return this.hasOne(Usuario, 'idUsuarios');
    },

    justificacion: function () {
        return this.hasOne(Justificacion, 'idAdjuntos');
    }

});

Timbradas = bookshelf.Collection.extend({
    model: Timbrada
});

module.exports = {
    Timbrada: bookshelf.model('Timbrada', Timbrada),
    Timbradas: bookshelf.collection('Timbradas', Timbradas)
};
