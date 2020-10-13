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
    }).fetch({withRelated: ['foto', 'rol']}).then(user => {
        if (user) {
            bcrypt.compare(pass, user.attributes.password, (err, re) => {
                if (re) {
                    let token;
                    delete user.attributes.password;
                    token = jwt.sign({user}, 'my-secret-token');
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
    let {oldPassword, newPassword, idUsuarios} = req.body;
    console.log(req.body);
    Usuario.where('idUsuarios', idUsuarios).fetch({withRelated: ['foto', 'rol']}).then(usuario => {
        if (usuario) {
            bcrypt.compare(oldPassword, usuario.attributes.password, (err, re) => {
                if (re) {
                    bcrypt.hash(newPassword, 10, function (err, hash) {
                        usuario.attributes.password = hash;
                        new Usuario(usuario.attributes).save().then(result => {
                            return res.status(200).json({
                                ok: true,
                                mensaje: `CONTRASENA ACTUALIZADA CON EXITO`
                            })
                        }).catch(error => {
                            return res.status(500).json({
                                ok: false,
                                mensaje: `USUARIO/CONTRASENA INCORRECTOS`
                            })
                        })
                    });

                } else {
                    return res.status(500).json({
                        ok: false,
                        mensaje: `LAS CONTRASENAS NO COINCIDEN`
                    })
                }

            })
        }
    }).catch(err => {

    })

}

module.exports = {
    login,
    changePassword,
    encriptarPassword
};
