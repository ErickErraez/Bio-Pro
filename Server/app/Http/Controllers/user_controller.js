;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);


let registerUser = (req, res) => {
    let {nombre, apellido, email, contrasena, rol} = req.body.params;
    db('PERSONAS').where({'email': email}).then(result => {
        console.log(result.length)
        if (result.length === 1) {
            return res.status(500).json({
                ok: false,
                message: 'Correo ya existe'
            })
        } else {
            bcrypt.hash(contrasena, 10, function (err, hash) {
                db('PERSONAS').insert({
                    nombre,
                    apellido,
                    email,
                    contrasena: hash,
                    rol
                }).returning('idPersona')
                    .then(result => {
                        return res.status(200).json({
                            ok: true,
                            action: 'Insert',
                            id: result
                        })
                    });
            });
        }
    })

};

//AUTH ADMIN
let loginUser = (req, res) => {
        let tabla = 'Usuarios';
        let {password, correo} = req.body.params;
        res.header('access-control-allow-origin', '*');
        db(tabla).where({'correo': correo})
            .select('idUsuarios', 'nombre1', 'apellido1', 'cedula', 'correo', 'password', 'nivel', 'rol')
            .then(result => {
                if (result.length === 1) {
                    bcrypt.compare(password, result[0].password, (err, re) => {
                        return res.status(200).json({
                            ok: true,
                            usuario: {
                                'idUsuarios': result[0].idUsuarios,
                                'nombre1': result[0].nombre1,
                                'apellido1': result[0].apellido1,
                                'cedula': result[0].cedula,
                                'correo': result[0].correo,
                                'nivel': result[0].nivel,
                                'rol': result[0].rol
                            }
                        });
                    });
                } else {
                    return res.status(500).json({
                        ok: false,
                        message: 'No encontrado'
                    })
                }
            }).catch(error => {
            console.log(error);
        });

    }
;

let insertUsers = (req, res) => {
    let tabla = 'Usuarios';
    let datos = req.body;
    db(tabla).insert(datos).then(resultado => {
        return res.status(200).json({
            ok: true,
            mensaje: 'CREADO CON EXITO',
            datos: resultado
        })

    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${error}`
        })
    })
};

let createUser = (req, res) => {
    let tabla = 'Usuarios';
    let {nombre1, apellido1, cedula, correo, password, nivel, rol} = req.body;
    bcrypt.hash(password, 10, function (err, hash) {
        const qu = db.insert({
            nombre1,
            apellido1,
            cedula,
            correo,
            password: hash,
            nivel,
            rol
        }).into(tabla);
        qu.then(resultado => {
            let idUsuarios = resultado[0];
            const user = db(tabla).where('idUsuarios', idUsuarios).select('idUsuarios', 'nombre1', 'apellido1', 'cedula', 'correo', 'nivel', 'rol').first();
            user.then(response => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'CREADO CON EXITO',
                    datos: response
                })
            }).catch(err => {

            })
        }).catch((error) => {
            return res.status(500).json({
                ok: false,
                mensaje: `Error del servidor: ${error}`
            })
        })
    });

};

let allUsers = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body;
    const proyecto = db('Usuarios').select('idUsuarios', 'nombre1', 'apellido1', 'cedula', 'correo', 'nivel', 'rol');
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            message: 'Error en el Servidor'
        })
    });
};

let getUserByEmail = (req, res) => {
    let datos = req.params.email;
    console.log(datos);
    const proyecto = db('Usuarios').where('correo', datos).select('idUsuarios', 'nombre1', 'apellido1', 'cedula', 'correo', 'nivel', 'rol').orderBy('Nivel', 'desc');
    proyecto.then(response => {
        if (response.length == 0) {
            return res.status(200).json({
                ok: false,
                mensaje: 'No Existe'
            })
        }
        if (response.length > 0) {
            return res.status(200).json({
                ok: true,
                mensaje: 'Encontrado con Exito',
                datos: response[0]
            })
        }
    }).catch(err => {
        return res.status(500).json({
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let modifyUser = (req, res) => {
    let tabla = 'Usuarios';
    let {idUsuarios, nombre1, apellido1, cedula, correo, password, nivel, rol} = req.body;
    bcrypt.hash(password, 10, function (err, hash) {
        db(tabla)
            .where('idUsuarios', '=', idUsuarios)
            .update({
                nombre1,
                apellido1,
                password: hash,
                correo,
                cedula,
                nivel,
                rol

            }).then(function (result) {
            return res.status(200).json({
                ok: true,
                action: 'Actualizado con Exito',
                id: result
            })
        }).catch(function (err) {
            return res.send(err)
        });

    });
};
let welcome = (req, res) => {
    return res.status(200).json({
        action: 'Servidor Funcionando'
    })
};

module.exports = {
    //CRUD USERS
    loginUser,
    registerUser,
    allUsers,
    createUser,
    getUserByEmail,
    insertUsers,
    modifyUser,
    welcome
};
