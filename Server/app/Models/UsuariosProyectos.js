const bookshelf = require('../../bookshelf');
const Usuario = require('./Usuarios').User;
const Proyecto = require('./Proyectos').Proyecto;

var UsuariosProyecto,
    UsuariosProyectos;

UsuariosProyecto = bookshelf.Model.extend({
    tableName: 'UsuariosProyectos',
    idAttribute: 'idEstudiante',

    estudiante: function () {
        return this.hasMany(Usuario, 'idUsuarios');
    },
    proyecto: function () {
        return this.hasMany(Proyecto, 'idProyectos');
    }
});

UsuariosProyectos = bookshelf.Collection.extend({
    model: UsuariosProyecto
});

module.exports = {
    UsuariosProyecto: bookshelf.model('UsuariosProyecto', UsuariosProyecto),
    UsuariosProyectos: bookshelf.collection('UsuariosProyectos', UsuariosProyectos)
};
