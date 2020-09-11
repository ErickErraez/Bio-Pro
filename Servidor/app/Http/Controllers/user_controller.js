;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../knexfile');
const db = require('knex')(config['development']);
const Usuario = require('../../Models/Usuarios').User;


//METODOS GET
let welcome = (req, res) => {
    return res.status(200).json({
        action: 'Servidor Funcionando'
    })
};

let getUserById = (req, res) => {
    let id = req.params.id;
    Usuario.query({
        where: {idUsuarios: id}
    }).fetch({withRelated: ['rol']})
        .then(response => {
            return res.status(200).json({
                ok: true,
                response
            })
        }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
}

module.exports = {
    welcome,
    getUserById
};
