const bookshelf = require('../../bookshelf');

var Rol,
    Roles;

Rol = bookshelf.Model.extend({
    tableName: 'Roles',
    idAttribute: 'idRoles'
});

Roles = bookshelf.Collection.extend({
    model: Rol
});

module.exports = {
    Rol: bookshelf.model('Rol', Rol),
    Roles: bookshelf.collection('Roles', Roles)
};
