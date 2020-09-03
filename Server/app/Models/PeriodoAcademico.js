const bookshelf = require('../../bookshelf');

var PeriodoAcademico,
    PeriodoAcademicos;

PeriodoAcademico = bookshelf.Model.extend({
    tableName: 'PeriodoAcademico',
    idAttribute: 'idPeriodoAcademico'
});

PeriodoAcademicos = bookshelf.Collection.extend({
    model: PeriodoAcademico
});

module.exports = {
    PeriodoAcademico: bookshelf.model('PeriodoAcademico', PeriodoAcademico),
    PeriodoAcademicos: bookshelf.collection('PeriodoAcademicos', PeriodoAcademicos)
};
