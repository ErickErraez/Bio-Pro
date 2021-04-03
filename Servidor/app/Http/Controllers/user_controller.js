;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../knexfile');
const db = require('knex')(config['development']);
const Usuario = require('../../Models/Usuarios').User;
const Image = require('../../Models/Adjunto').Adjunto;
const Timbrada = require('../../Models/Timbradas').Timbrada;
const Timbradas = require('../../Models/Timbradas').Timbradas;
const Rol = require('../../Models/Roles').Rol;
const Usuarios = require('../../Models/Usuarios').Users;


//METODOS GET
let welcome = (req, res) => {
    return res.status(200).json({
        action: 'Servidor Funcionando'
    })
};


let dataApi = (req, res) => {

    new Timbradas().fetch({withRelated: ['usuario']}).then(function (user) {
        const data = JSON.stringify(user);
        const response = JSON.parse(data);
        for (var i = 0; i < response.length; i++) {
            delete response[i].usuario.password;
            delete response[i].usuario.newpassword;
            delete response[i].usuario.rol;
            delete response[i].usuario.created_at;
            delete response[i].usuario.updated_at;
            delete response[i].created_at;
            delete response[i].updated_at;
            delete response[i].usuario.foto;
            delete response[i].usuario.tipocontrato;
            delete response[i].justificacion;
            response[i].fecha = response[i].fecha.split('T')[0];

            if (response[i].entrada) {
                if (response[i].entrada.split(':')[2] == '01') {
                    response[i].entrada = response[i].entrada.split(':')[0] + ":" + response[i].entrada.split(':')[1] + '-Yavirac'
                }
                if (response[i].entrada.split(':')[2] == '02') {
                    response[i].entrada = response[i].entrada.split(':')[0] + ":" + response[i].entrada.split(':')[1] + '-Cenepa'
                }
            }
            if (response[i].almuerzo) {
                if (response[i].almuerzo.split(':')[2] == '01') {
                    response[i].almuerzo = response[i].almuerzo.split(':')[0] + ":" + response[i].almuerzo.split(':')[1] + '-Yavirac'
                }
                if (response[i].almuerzo.split(':')[2] == '02') {
                    response[i].almuerzo = response[i].almuerzo.split(':')[0] + ":" + response[i].almuerzo.split(':')[1] + '-Cenepa'
                }
            }
            if (response[i].regresoAlmuerzo) {
                if (response[i].regresoAlmuerzo.split(':')[2] == '01') {
                    response[i].regresoAlmuerzo = response[i].regresoAlmuerzo.split(':')[0] + ":" + response[i].regresoAlmuerzo.split(':')[1] + '-Yavirac'
                }
                if (response[i].regresoAlmuerzo.split(':')[2] == '02') {
                    response[i].regresoAlmuerzo = response[i].regresoAlmuerzo.split(':')[0] + ":" + response[i].regresoAlmuerzo.split(':')[1] + '-Cenepa'
                }
            }
            if (response[i].salida) {
                if (response[i].salida.split(':')[2] == '01') {
                    response[i].salida = response[i].salida.split(':')[0] + ":" + response[i].salida.split(':')[1] + '-Yavirac'
                }
                if (response[i].salida.split(':')[2] == '02') {
                    response[i].salida = response[i].salida.split(':')[0] + ":" + response[i].salida.split(':')[1] + '-Cenepa'
                }
            }
        }
        return res.status(200).json({
            ok: true,
            response
        })
    }).catch(function (err) {
        return res.status(500).json({
            ok: false,
            err
        })
    });
};


let getUserById = (req, res) => {
    let id = req.params.id;
    Usuario.query({
        where: {idUsuarios: id}
    }).fetch({withRelated: ['rol']})
        .then(user => {
            return res.status(200).json({
                ok: true,
                user
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
            message: 'FOTO ACTUALIZADA CON EXITO',
            response
        })

    }).catch(err => {
        return res.status(500).json({
            ok: true,
            message: 'OCURRIO UN ERROR AL ACTUALIZAR LA FOTO',
            err
        })
    })
}

let userJustification = (req, res) => {
    new Image(req.body).save().then(image => {
        return res.status(200).json({
            ok: true,
            message: 'JUSTIFICACION ENVIADA CON EXITO',
            image
        })

    }).catch(err => {
        return res.status(500).json({
            ok: true,
            message: 'OCURRIO UN ERROR AL ENVIAR LA JUSTIFICACION',
            err
        })
    })
}

let updateTimbrada = (req, res) => {

    delete req.body.total;
    req.body.fecha = req.body.fecha.split('T')[0]

    new Timbrada(req.body).save().then(timbrada => {
        return res.status(200).json({
            ok: true,
            message: 'JUSTIFICACION ENVIADA CON EXITO',
            timbrada
        })

    }).catch(err => {
        return res.status(500).json({
            ok: true,
            message: 'OCURRIO UN ERROR AL ENVIAR LA JUSTIFICACION',
            err
        })
    })
}


let addUSer = (req, res) => {
    //BUSQUEDA DEL ID QUE NO EXISTA

    idFoto = req.body.foto.idAdjuntos;
    idRol = req.body.rol.idRoles;
    delete req.body.foto;
    delete req.body.rol;
    req.body.foto = idFoto;
    req.body.rol = idRol;

    //WHERE QUE MANDAS EL IDBIO LA CEDULA Y EL CORREO
    db('Bio-Usuarios').where('idBio', '=', req.body.idBio)
        .orWhere('correo', '=', req.body.correo)
        .orWhere('cedula', '=', req.body.cedula)
        .then(response => {
            if (response.length == 0) {
                new Usuario(req.body).save().then(response => {
                    return res.status(200).json({
                        ok: true,
                        message: 'USUARIO CREADO CON ÉXITO',
                        response
                    })
                }).catch(err => {
                    return res.status(500).json({
                        ok: true,
                        message: 'OCURRIO UN ERROR AL GUARDAR EL USUARIO',
                        err
                    })
                })
            } else {
                return res.status(500).json({
                    ok: false,
                    message: 'EL USUARIO YA EXISTE'
                })
            }


        }).catch(err => {

    });

}

let updateUser = (req, res) => {
    if (req.body.foto) {
        idFoto = req.body.foto.idAdjuntos;
        delete req.body.foto;
        delete req.body.rol;
        req.body.foto = idFoto;
    }

    new Usuario(req.body).save().then(response => {
        return res.status(200).json({
            ok: true,
            message: 'FOTO CREADA CON EXITO',
            response
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            ok: false,
            message: 'OCURRIO UN ERROR AL ACTUALIZAR LA FOTO',
            err
        })

    });

}

let updateUserData = (req, res) => {

    if (req.body.rol) {
        idRol = req.body.foto.idAdjuntos;
        delete req.body.foto;
        delete req.body.rol;
        req.body.rol = idRol;
    }

    new Usuario(req.body).save().then(response => {
        return res.status(200).json({
            ok: true,
            message: 'USUARIO ACTUALIZADO CON EXITO',
            response
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            ok: false,
            message: 'OCURRIO UN ERROR AL ACTUALIZAR',
            err
        })

    });

}

let updateUserForgot = (req, res) => {
    if (req.body.foto) {
        idFoto = req.body.foto.idAdjuntos;
        delete req.body.foto;
        delete req.body.rol;
        req.body.foto = idFoto;
    }

    new Usuario(req.body).save().then(response => {
        return res.status(200).json({
            ok: true,
            message: 'FOTO CREADA CON EXITO',
            response
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            ok: false,
            message: 'OCURRIO UN ERROR AL ACTUALIZAR LA FOTO',
            err
        })

    });

}
let getAdmin = (req, res) => {
    new Usuarios().query({
        where: {rol: req.params.idRoles = 2}
    }).fetch().then(function (user) {
        return res.status(200).json({
            ok: true,
            user
        })
    }).catch(function (err) {
        return res.status(500).json({
            ok: false,
            err
        })
    });

}


let getUserByEmail = (req, res) => {
    let email = req.params.email;
    Usuario.query({
        where: {correo: email}
    }).fetch()
        .then(usuario => {
            return res.status(200).json({
                ok: true,
                usuario
            })
        }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Usuario no Encontrado`
        })
    });
}

let deleteUser = (req, res) => {
    let idUsuarios = req.params.id;

    Usuario.forge({idUsuarios: idUsuarios}).destroy().then(resp => {
        return res.status(200).json({
            ok: true,
            message: 'USUARIO ELIMINADO CON EXITO',
            resp
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            message: 'OCURRIO UN ERROR AL ELIMINAR EL USUARIO',
            err
        })

    });
}


module.exports = {
    welcome,
    getUserById,
    getUserByEmail,
    userFoto,
    addUSer,
    updateUser,
    getAdmin,
    updateUserForgot,
    userJustification,
    updateTimbrada,
    updateUserData,
    deleteUser,
    dataApi
};
