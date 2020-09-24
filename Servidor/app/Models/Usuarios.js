const bookshelf = require('../../bookshelf');
const Rol = require('./Roles').Rol;
const Adjunto = require('./Adjunto').Adjunto;

var User,
    Users;

User = bookshelf.Model.extend({
    tableName: 'Bio-Usuarios',
    idAttribute: 'idUsuarios',
    rol: function () {
        return this.hasOne(Rol, 'idRoles');
    },
    foto: function () {
        return this.hasOne(Adjunto, 'idAdjuntos');
    }
});

Users = bookshelf.Collection.extend({
    model: User
});

module.exports = {
    User: bookshelf.model('User', User),
    Users: bookshelf.collection('Users', Users)
};
