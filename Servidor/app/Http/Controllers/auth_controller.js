;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../knexfile');
const db = require('knex')(config['development']);
const Usuario = require('../../Models/Usuarios').User;


let encriptarPassword = (req, res) => {
    let {pass} = req.body;
    bcrypt.hash(pass, 10, function (err, hash) {
        res.status(404).json({
            ok: true,
            mensaje: hash
        })
    });
};

let login = (req, res) => {
    let {pass, email} = req.body;
    Usuario.query({
        where: {correo: email}
    }).fetch({withRelated: ['rol']}).then(user => {
        if (user) {
            bcrypt.compare(pass, user.attributes.password, (err, re) => {
                if (re) {
                    let token;
                    if (user.relations.rol.attributes.descripcion == 'ADMINISTRADOR') {
                        delete user.attributes.password;
                        token = jwt.sign({user}, 'adminToken');
                    }
                    if (user.relations.rol.attributes.descripcion == 'USUARIO') {
                        delete user.attributes.password;
                        token = jwt.sign({user}, 'userToken');
                    }
                    delete user.attributes.password;
                    return res.status(200).json({
                        message: 'LOGUEADO CON EXITO',
                        user,
                        session_id: token
                    })
                } else {
                    return res.status(404).json({
                        ok: false,
                        mensaje: `USUARIO/CONTRASENA INCORRECTOS`
                    })
                }
            })
        }
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error: ${err}`
        })
    })


};

let changePassword = (req, res) => {
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
    login,
    changePassword,
    encriptarPassword
};
