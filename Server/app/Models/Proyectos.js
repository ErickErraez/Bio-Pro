const bookshelf = require('../../bookshelf');
const Usuario = require('./Usuarios').User;
const Periodo = require('./PeriodoAcademico').PeriodoAcademico;
const Categoria = require('./Categorias').Categoria;

var Proyecto,
    Proyectos;

Proyecto = bookshelf.Model.extend({
    tableName: 'Proyectos',
    idAttribute: 'idProyectos',
    tutor: function () {
        return this.hasMany(Usuario, 'idUsuarios');
    },
    jurado1: function () {
        return this.hasMany(Usuario, 'idUsuarios');
    },
    jurado2: function () {
        return this.hasMany(Usuario, 'idUsuarios');
    },
    periodoAcademico: function () {
        return this.hasMany(Periodo, 'idPeriodoAcademico');
    },
    categoria: function () {
        return this.hasMany(Categoria, 'idCategorias');
    }

});

Proyectos = bookshelf.Collection.extend({
    model: Proyecto
});

module.exports = {
    Proyecto: bookshelf.model('Proyecto', Proyecto),
    Proyectos: bookshelf.collection('Proyectos', Proyectos)
};
