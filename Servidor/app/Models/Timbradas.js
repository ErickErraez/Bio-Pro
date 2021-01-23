const bookshelf = require('../../bookshelf');
const Usuario = require('./Usuarios').User;
const Justificacion = require('./Adjunto').Adjunto;

var Timbrada,
    Timbradas;

Timbrada = bookshelf.Model.extend({
    tableName: 'Bio-Timbradas',
    idAttribute: 'idTimbradas',

    usuario: function () {
        return this.hasOne(Usuario, 'idUsuarios','usuario');
    },

    justificacion: function () {
        return this.hasOne(Justificacion, 'idAdjuntos','justificacion');
    }

});

Timbradas = bookshelf.Collection.extend({
    model: Timbrada
});

module.exports = {
    Timbrada: bookshelf.model('Timbrada', Timbrada),
    Timbradas: bookshelf.collection('Timbradas', Timbradas)
};
