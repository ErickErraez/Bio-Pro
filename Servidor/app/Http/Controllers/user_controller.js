;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../knexfile');
const db = require('knex')(config['development']);
const Usuario = require('../../Models/Usuarios').User;
const Image = require('../../Models/Adjunto').Adjunto;
const Rol = require('../../Models/Roles').Rol;


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

let userFoto = (req, res) => {
    new Image(req.body).save().then(response => {
        return res.status(200).json({
            ok: true,
            message:'FOTO ACTUALIZADA CON EXITO',
            response
        })

    }).catch(err => {
        return res.status(500).json({
            ok: true,
            message:'OCURRIO UN ERROR AL ACTUALIZAR LA FOTO',
            err
        })
    })
}

let updateUser = (req, res) => {
    idFoto = req.body.foto.idAdjuntos;
    delete req.body.foto;
    delete req.body.rol;
    req.body.foto = idFoto;
    new Usuario(req.body).save().then(response => {
        return res.status(200).json({
            ok: true,
            message:'FOTO CREADA CON EXITO',
            response
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            ok: false,
            message:'OCURRIO UN ERROR AL ACTUALIZAR LA FOTO',
            err
        })

    });

}

module.exports = {
    welcome,
    getUserById,
    userFoto,
    updateUser
};
