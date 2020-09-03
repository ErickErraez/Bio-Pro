const bookshelf = require('../../bookshelf');

var TipoEvaluacion,
    TipoEvaluacions;

TipoEvaluacion = bookshelf.Model.extend({
    tableName: 'TipoEvaluaciones',
    idAttribute: 'idTipoEvaluaciones'
});

TipoEvaluaciones = bookshelf.Collection.extend({
    model: TipoEvaluacion
});

module.exports = {
    TipoEvaluacion: bookshelf.model('TipoEvaluacion', TipoEvaluacion),
    TipoEvaluaciones: bookshelf.collection('TipoEvaluaciones', TipoEvaluaciones)
};
