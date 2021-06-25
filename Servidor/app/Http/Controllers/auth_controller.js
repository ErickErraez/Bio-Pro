;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../knexfile');
const db = require('knex')(config['development']);
const Usuario = require('../../Models/Usuarios').User;
const Usuarios = require('../../Models/Usuarios').Users;
const Timbrada = require('../../Models/Timbradas').Timbrada;
const Timbradas = require('../../Models/Timbradas').Timbradas;
const Rol = require('../../Models/Roles').Rol;
const Foto = require('../../Models/Adjunto').Adjunto;


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
                        Rol.query({
                            where: {idRoles: user.attributes.rol}
                        }).fetch().then(rol => {

                            user.attributes.rol = rol.attributes;
                            if (user.attributes.foto != null) {
                                Foto.query({
                                    where: {idAdjuntos: user.attributes.foto}
                                }).fetch().then(foto => {
                                    user.attributes.foto = foto.attributes;
                                    let token;
                                    delete user.attributes.password;
                                    token = jwt.sign({user}, 'my-secret-token');
                                    delete user.attributes.password;
                                    return res.status(200).json({
                                        message: 'LOGUEADO CON EXITO',
                                        user,
                                        session_id: token
                                    })
                                })
                            } else {
                                let token;
                                delete user.attributes.password;
                                token = jwt.sign({user}, 'my-secret-token');
                                delete user.attributes.password;
                                return res.status(200).json({
                                    message: 'LOGUEADO CON EXITO',
                                    user,
                                    session_id: token
                                })
                            }
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


    }
;

let changePassword = (req, res) => {
    let {oldPassword, newPassword, idUsuarios} = req.body;
    Usuario.where('idUsuarios', idUsuarios).fetch({withRelated: ['foto', 'rol']}).then(usuario => {
        if (usuario) {
            bcrypt.compare(oldPassword, usuario.attributes.password, (err, re) => {
                if (re) {
                    bcrypt.hash(newPassword, 10, function (err, hash) {
                        usuario.attributes.password = hash;
                        new Usuario(usuario.attributes).save().then(result => {
                            return res.status(200).json({
                                ok: true,
                                mensaje: `CONTRASEÑA ACTUALIZADA CON EXITO`
                            })
                        }).catch(error => {
                            return res.status(500).json({
                                ok: false,
                                mensaje: `USUARIO/CONTRASEÑA INCORRECTOS`
                            })
                        })
                    });

                } else {
                    return res.status(500).json({
                        ok: false,
                        mensaje: `LA CONTRASEÑA ACTUAL NO ES CORRECTA`
                    })
                }

            })
        }
    }).catch(err => {

    })

}


let updateUser = (req, res) => {

    const idRol = req.body.rol.idRoles;
    var idFoto = null
    if (req.body.foto !== null) {
        idFoto = req.body.foto.idAdjuntos;
    }

    delete req.body.foto;
    delete req.body.rol;

    req.body.rol = idRol;
    if (idFoto !== null) {
        req.body.foto = idFoto;
    }

    new Usuario(req.body).save().then(response => {
        return res.status(200).json({
            ok: true,
            message: 'USUARIO ACTUALIZADO CON EXITO',
            response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            message: 'OCURRIO UN ERROR AL ACTUALIZAR LA FOTO',
            err
        })

    });

}
let getTimbradas = (req, res) => {
    new Timbradas().query({
        where: {usuario: req.params.idBio}
    }).fetch({withRelated: ['justificacion', 'usuario']}).then(function (timbrada) {
        return res.status(200).json({
            ok: true,
            timbrada
        })
    }).catch(function (err) {
        return res.status(500).json({
            ok: false,
            err
        })
    });
}

let getTimbradaById = (req, res) => {
    new Timbrada().query({
        where: {justificacion: req.params.idJus}
    }).fetch({withRelated: ['justificacion']}).then(function (timbrada) {
        return res.status(200).json({
            ok: true,
            timbrada
        })
    }).catch(function (err) {
        return res.status(500).json({
            ok: false,
            err
        })
    });

}

let getUsers = (req, res) => {

    new Usuarios().fetch().then(function (users) {
        return res.status(200).json({
            ok: true,
            users
        })
    }).catch(function (err) {
        return res.status(500).json({
            ok: true,
            err
        })
    });
}


let getData = (req, res) => {
    new Timbrada().query({
        where: {fecha: req.body.fecha, usuario: req.body.usuario.idBio}
    }).fetch({withRelated: ['justificacion']}).then(function (timbrada) {

        if (timbrada) {
            return res.status(200).json({
                ok: true,
                timbrada
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No Existe el Registro'
            })
        }

    }).catch(function (err) {
        return res.status(500).json({
            ok: false,
            err
        })
    });


}

let saveFile = (req, res) => {
    const idUsuario = req.body.usuario.idBio;
    delete req.body.usuario;
    req.body.usuario = idUsuario;

    new Timbrada(req.body).save().then(function (users) {
        return res.status(200).json({
            ok: true,
            users
        })
    }).catch(function (err) {
        return res.status(500).json({
            ok: true,
            err
        })
    });


}
let getTodasTimbradas = (req, res) => {

    db('Bio-Timbradas').select('Bio-Timbradas.*', 'Bio-Usuarios.*')
        .innerJoin('Bio-Usuarios', 'Bio-Timbradas.usuario', 'Bio-Usuarios.idBio')
        .then(timbrada => {
            return res.status(200).json({
                ok: true,
                timbrada
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: true,
                err
            })
        })
}


module.exports = {
    login,
    changePassword,
    encriptarPassword,
    updateUser,
    getUsers,
    getData,
    saveFile,
    getTimbradas,
    getTodasTimbradas,
    getTimbradaById
};
