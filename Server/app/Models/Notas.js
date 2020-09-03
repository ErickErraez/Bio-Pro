const bookshelf = require('../../bookshelf');
const TipoEvaluacion = require('./TipoEvaluaciones').TipoEvaluacion;
const UsuariosProyecto = require('./UsuariosProyectos').UsuariosProyecto;

var Nota,
    Notas;

Nota = bookshelf.Model.extend({
    tableName: 'Notas',
    idAttribute: 'idNotas',
    tipoEvaluacion: function () {
        return this.hasMany(TipoEvaluacion, 'idTipoEvaluaciones');
    },
    usuariosProyectos: function () {
        return this.hasMany(UsuariosProyecto, 'idUsuariosProyectos');
    }
});

Notas = bookshelf.Collection.extend({
    model: Nota
});

module.exports = {
    Nota: bookshelf.model('Nota', Nota),
    Notas: bookshelf.collection('Notas', Notas)
};
