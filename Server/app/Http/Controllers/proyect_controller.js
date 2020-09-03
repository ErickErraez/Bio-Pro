;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);
const Proyecto = require('../../Models/Proyectos').Proyecto;
const UserProyects = require('../../Models/UsuariosProyectos').UsuariosProyectos;


let getUserProyect = (req, res) => {
    let tabla = 'UsuariosProyectos';
    let datos = req.params.id;
    const proyecto = db(tabla).orderBy('Proyectos.created_at', 'desc').where('idEstudiante', datos).whereNot('Proyectos.estado', 'Pendiente')
        .innerJoin('Proyectos', 'UsuariosProyectos.idProyecto', 'Proyectos.idProyectos')
        .innerJoin('Usuarios as Tutor', 'Proyectos.Tutor', 'Tutor.idUsuarios')
        .innerJoin('Usuarios as Jurado1', 'Proyectos.jurado1', 'Jurado1.idUsuarios')
        .innerJoin('Usuarios as Jurado2', 'Proyectos.jurado2', 'Jurado2.idUsuarios')
        .innerJoin('Categorias', 'Proyectos.idCategoria', 'Categorias.idCategorias')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .select('UsuariosProyectos.idUsuariosProyectos', 'UsuariosProyectos.idEstudiante', 'UsuariosProyectos.idProyecto',
            'Proyectos.nombre as nombreProyecto', 'Proyectos.descripcion as descripcionProyecto', 'Proyectos.estado as estadoProyecto',
            'Proyectos.herramientas as herramientasProyecto', 'Proyectos.nivel as nivelProyecto', db.raw(`CONCAT(Tutor.nombre1, ' ', Tutor.apellido1) as "tutor"`),
            db.raw(`CONCAT(Jurado1.nombre1, ' ', Jurado1.apellido1) as "jurado1"`), db.raw(`CONCAT(Jurado2.nombre1, ' ', Jurado2.apellido1) as "jurado2"`), 'Categorias.nombre as categoria',
            'PeriodoAcademico.nombre as periodo', 'PeriodoAcademico.estado as estadoPeriodo');
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let getTutorUserProyects = (req, res) => {
    let tabla = 'UsuariosProyectos';
    let idTeacher = req.params.id;
    const proyecto = db(tabla).orderBy('Proyectos.created_at', 'desc')
        .where('Proyectos.tutor', idTeacher).andWhere('PeriodoAcademico.estado', 'Activo')
        .innerJoin('Proyectos', 'UsuariosProyectos.idProyecto', 'Proyectos.idProyectos')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .select();
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};


let getUserPendingProyect = (req, res) => {
    let tabla = 'UsuariosProyectos';
    let datos = req.params.id;
    const proyecto = db(tabla).orderBy('Proyectos.created_at', 'desc').where('idEstudiante', datos).where('Proyectos.estado', 'Pendiente')
        .innerJoin('Proyectos', 'UsuariosProyectos.idProyecto', 'Proyectos.idProyectos')
        .innerJoin('Categorias', 'Proyectos.idCategoria', 'Categorias.idCategorias')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .select('UsuariosProyectos.idUsuariosProyectos', 'UsuariosProyectos.idEstudiante', 'UsuariosProyectos.idProyecto',
            'Proyectos.nombre as nombreProyecto', 'Proyectos.descripcion as descripcionProyecto', 'Proyectos.estado as estadoProyecto',
            'Proyectos.herramientas as herramientasProyecto', 'Proyectos.nivel as nivelProyecto', 'Proyectos.paralelo as paralelo',
            'Categorias.nombre as categoria',
            'PeriodoAcademico.nombre as periodo', 'PeriodoAcademico.estado as estadoPeriodo');
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let getTutorProyects = (req, res) => {
    let datos = req.params.id;
    const proyecto = db('Proyectos').orderBy('Proyectos.created_at', 'desc')
        .where('Proyectos.tutor', datos).andWhere('PeriodoAcademico.estado', '=', 'Activo')
        .innerJoin('Usuarios as Tutor', 'Proyectos.Tutor', 'Tutor.idUsuarios')
        .innerJoin('Usuarios as Jurado1', 'Proyectos.jurado1', 'Jurado1.idUsuarios')
        .innerJoin('Usuarios as Jurado2', 'Proyectos.jurado2', 'Jurado2.idUsuarios')
        .innerJoin('Categorias', 'Proyectos.idCategoria', 'Categorias.idCategorias')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .select('Proyectos.idProyectos', 'Proyectos.nombre as nombreProyecto', 'Proyectos.descripcion as descripcionProyecto', 'Proyectos.estado as estadoProyecto',
            'Proyectos.herramientas as herramientasProyecto', 'Proyectos.nivel as nivelProyecto', db.raw(`CONCAT(Tutor.nombre1, ' ', Tutor.apellido1) as "tutor"`),
            db.raw(`CONCAT(Jurado1.nombre1, ' ', Jurado1.apellido1) as "jurado1"`), db.raw(`CONCAT(Jurado2.nombre1, ' ', Jurado2.apellido1) as "jurado2"`), 'Categorias.nombre as categoria',
            'PeriodoAcademico.nombre as periodo', 'PeriodoAcademico.estado as estadoPeriodo');
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let getUserProyectWorks = (req, res) => {
    let tabla = 'Notas';
    let id = req.params.id;
    let idProyecto = req.params.idProyecto;
    const works = db('Notas').orderBy('Notas.created_at', 'desc')
        .where('UsuariosProyectos.idEstudiante', id).andWhere('PeriodoAcademico.estado', 'Activo')
        .andWhere('UsuariosProyectos.idProyecto', idProyecto)
        .innerJoin('TipoEvaluaciones', 'Notas.idTipoEvaluacion', 'TipoEvaluaciones.idTipoEvaluaciones')
        .innerJoin('UsuariosProyectos', 'Notas.idUsuariosProyectos', 'UsuariosProyectos.idUsuariosProyectos')
        .innerJoin('Usuarios', 'UsuariosProyectos.idEstudiante', 'Usuarios.idUsuarios')
        .innerJoin('Proyectos', 'UsuariosProyectos.idProyecto', 'Proyectos.idProyectos')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .select();
    works.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let getNotas = (req, res) => {
    let tabla = 'Notas';
    let id = req.params.id;
    const notas = db(tabla).innerJoin('TipoEvaluaciones', 'Notas.idTipoEvaluacion', 'TipoEvaluaciones.idTipoEvaluaciones')
        .select('Notas.*', 'TipoEvaluaciones.tipo').where('idNotas', id).first();
    notas.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let createAdjuntos = (req, res) => {
    let tabla = 'Adjuntos';
    let datos = req.body;
    const adjuntos = db(tabla).insert(datos);
    adjuntos.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Creado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let getAdjuntosByNotas = (req, res) => {
    let tabla = 'Adjuntos';
    let id = req.params.id;
    const notas = db(tabla).innerJoin('Notas', 'Adjuntos.idNotas', 'Notas.idNotas')
        .select('Adjuntos.*', 'Notas.*').where('Adjuntos.idNotas', id);
    notas.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let getTeacherProyectWorks = (req, res) => {
    let tabla = 'Notas';
    let id = req.params.id;
    let idProyecto = req.params.idProyecto;
    const works = db(tabla).orderBy('Notas.created_at', 'asc')
        .andWhere('Proyectos.tutor', id).andWhere('PeriodoAcademico.estado', 'Activo')
        .andWhere('UsuariosProyectos.idProyecto', idProyecto)
        .innerJoin('TipoEvaluaciones', 'Notas.idTipoEvaluacion', 'TipoEvaluaciones.idTipoEvaluaciones')
        .innerJoin('UsuariosProyectos', 'Notas.idUsuariosProyectos', 'UsuariosProyectos.idUsuariosProyectos')
        .innerJoin('Proyectos', 'UsuariosProyectos.idProyecto', 'Proyectos.idProyectos')
        .innerJoin('Usuarios', 'UsuariosProyectos.idEstudiante', 'Usuarios.idUsuarios')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .select('Notas.*', 'Usuarios.idUsuarios', 'TipoEvaluaciones.tipo', db.raw(`CONCAT(Usuarios.nombre1, ' ', Usuarios.apellido1) as "estudiante"`),);
    works.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let getById = (req, res) => {
    let tabla = 'Proyectos';
    let id = req.params.id;
    const proyecto = db(tabla).where('idProyectos', id).select('Proyectos.idProyectos as idProyecto', 'nombre', 'descripcion', 'herramientas', 'estado', 'nivel', 'paralelo', 'idCategoria', 'idPeriodo', 'observaciones').first();
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let actualizarNota = (req, res) => {
    let tabla = 'Notas';
    let datos = req.body;
    delete datos.tipo;
    const qu = db(tabla).where("idNotas", datos.idNotas).update(datos);
    qu.then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Se actualizo correctamente el registro`
        })
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: `Error del servidor: ${error}`
        })
    })
};


let actualizarProyecto = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body;
    datos.idProyectos = datos.idProyecto;
    delete datos.idProyecto;
    const qu = db(tabla).where("idProyectos", datos.idProyectos).update(datos);
    qu.then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Se actualizo correctamente el registro`
        })
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: `Error del servidor: ${error}`
        })
    })
};

let getProyectById = (req, res) => {
    let tabla = 'UsuariosProyectos';
    let datos = req.params.id;
    const proyecto = db(tabla).orderBy('Proyectos.created_at', 'desc').where('idUsuariosProyectos', datos).first()
        .innerJoin('Proyectos', 'UsuariosProyectos.idProyecto', 'Proyectos.idProyectos')
        .innerJoin('Usuarios as Tutor', 'Proyectos.Tutor', 'Tutor.idUsuarios')
        .innerJoin('Usuarios as Jurado1', 'Proyectos.jurado1', 'Jurado1.idUsuarios')
        .innerJoin('Usuarios as Jurado2', 'Proyectos.jurado2', 'Jurado2.idUsuarios')
        .innerJoin('Categorias', 'Proyectos.idCategoria', 'Categorias.idCategorias')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .select('UsuariosProyectos.idUsuariosProyectos', 'UsuariosProyectos.idEstudiante', 'UsuariosProyectos.idProyecto',
            'Proyectos.nombre as nombreProyecto', 'Proyectos.descripcion as descripcionProyecto', 'Proyectos.estado as estadoProyecto',
            'Proyectos.herramientas as herramientasProyecto', 'Proyectos.nivel as nivelProyecto', db.raw(`CONCAT(Tutor.nombre1, ' ', Tutor.apellido1) as "tutor"`),
            db.raw(`CONCAT(Jurado1.nombre1, ' ', Jurado1.apellido1) as "jurado1"`), db.raw(`CONCAT(Jurado2.nombre1, ' ', Jurado2.apellido1) as "jurado2"`), 'Categorias.nombre as categoria',
            'PeriodoAcademico.nombre as periodo', 'PeriodoAcademico.estado as estadoPeriodo');
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};


let createForm = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body;
    const qu = db.insert(datos).into(tabla);
    qu.then(resultado => {
        idProyectos = resultado[0];
        const proyect = db(tabla).where('idProyectos', idProyectos).select('idProyectos', 'nombre', 'descripcion', 'herramientas', 'estado', 'idCategoria', 'idPeriodo').first();
        proyect.then(r => {
            let objeto;
            objeto = r;
            const ca = db('Categorias').where('idCategorias', objeto.idCategoria).select().first();
            ca.then(resp => {
                objeto.categoria = resp;
                const pa = db('Categorias').where('idCategorias', objeto.idCategoria).select().first();
                pa.then(periodoA => {
                    objeto.periodo = periodoA;
                    return res.status(200).json({
                        ok: true,
                        proyecto: objeto,
                        mensaje: `Registro Creado con Exito`
                    })
                }).catch(periodoE => {
                    return res.status(500).json({
                        ok: false,
                        mensaje: `Error del servidor: ${periodoE}`
                    })
                });

            }).catch(er => {
                return res.status(500).json({
                    ok: false,
                    datos: datos,
                    mensaje: `Error del servidor: ${er}`
                })
            });


        }).catch(err => {
            return res.status(500).json({
                ok: false,
                datos: datos,
                mensaje: `Error del servidor: ${err}`
            })
        });

    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: `Error del servidor: ${error}`
        })
    })
};

let getCategories = (req, res) => {
    let tabla = 'Categorias';
    db(tabla).select()
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
};


let getPeriodo = (req, res) => {
    let tabla = 'PeriodoAcademico';
    db(tabla).orderBy('created_at', 'desc').select().first()
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
};


let getProfesor = (req, res) => {
    let tabla = 'Usuarios';
    let datos = req.body;
    const profesor = db(tabla).innerJoin('Roles', 'Usuarios.rol', 'Roles.idRoles')
        .select('idUsuarios', 'Usuarios.nombre1', 'apellido1', 'correo', 'rol', 'Roles.nombre as rol_descripcion')
        .whereNot('rol', 2);
    profesor.then(r => {
        return res.status(200).json({
            ok: true,
            datos: r,
        });
    }).catch(er => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: 'Error de Servidor' + er
        })
    });
};

let createUserProyect = (req, res) => {
    let tabla = 'UsuariosProyectos';
    let datos = req.body;
    const qu = db.insert(datos).into(tabla);
    qu.then(r => {
        return res.status(200).json({
            ok: true,
            datos: r,
        });
    }).catch(er => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: 'Error de Servidor' + er
        })
    });
};

let getProyectos = (req, res) => {
    let tabla = 'Proyectos';
    let nivel = req.params.nivel;
    let paralelo = req.params.paralelo;
    const qu = db(tabla)
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .where('nivel', nivel).andWhere('paralelo', paralelo).andWhere('PeriodoAcademico.estado', 'Activo')
        .select('Proyectos.idProyectos', 'Proyectos.nombre', 'Proyectos.descripcion', 'Proyectos.herramientas',
            'Proyectos.estado', 'Proyectos.nivel', 'Proyectos.tutor', 'Proyectos.jurado1',
            'Proyectos.jurado2', 'PeriodoAcademico.nombre as nombrePeriodo');
    qu.then(r => {
        return res.status(200).json({
            ok: true,
            datos: r,
        });
    }).catch(er => {
        return res.status(500).json({
            ok: false,
            datos: er,
            mensaje: 'Error de Servidor' + er
        })
    });
}

let getUsersProyects = (req, res) => {
    let id = req.params.id;
    UserProyects.query({
        where: {idProyecto: id}
    })
        .fetch({withRelated: ['estudiante.rol', 'proyecto.tutor', 'proyecto.jurado1.rol', 'proyecto.jurado2.rol', 'proyecto.periodoAcademico', 'proyecto.categoria']})
        .then(response => {
            return res.status(200).json({
                ok: true,
                mensaje: 'ENCONTRADO CON EXITO',
                datos: response
            })
        }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let createWork = (req, res) => {
    let tabla = 'Notas';
    let datos = req.body;
    const qu = db.insert(datos).into(tabla);
    qu.then(r => {
        return res.status(200).json({
            ok: true,
            datos: r,
        });
    }).catch(er => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: 'Error de Servidor' + er
        })
    });
};

let updateState = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body;
    datos.idProyectos = datos.idProyecto;
    delete datos.idProyecto;
    const qu = db(tabla).where("idProyectos", datos.idProyectos).update(datos);
    qu.then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Se creo correctamente el registro`
        })
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${error}`
        })
    })
};

module.exports = {
    //CRUD USERS
    createForm,
    getCategories,
    getPeriodo,
    getProfesor,
    createUserProyect,
    getUsersProyects,
    getUserProyect,
    getProyectos,
    getProyectById,
    getTutorProyects,
    updateState,
    getById,
    getTutorUserProyects,
    getUserPendingProyect,
    actualizarProyecto,
    createWork,
    getTeacherProyectWorks,
    getUserProyectWorks,
    getNotas,
    getAdjuntosByNotas,
    createAdjuntos,
    actualizarNota
};
