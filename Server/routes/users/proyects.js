;
const express = require('express');
const api = express.Router(),
    proyectController = require('../../app/Http/Controllers/proyect_controller');

//GET METHODS
api.get('/getCategories', proyectController.getCategories);
api.get('/getDocentes', proyectController.getProfesor);
api.get('/getPeriodo', proyectController.getPeriodo);
api.get('/getUsersProyects/:id', proyectController.getUsersProyects);
api.get('/getUserProyect/:id', proyectController.getUserProyect);
api.get('/getProyectos/:nivel/:paralelo', proyectController.getProyectos);
api.get('/getProyectById/:id', proyectController.getProyectById);
api.get('/getTutorProyects/:id', proyectController.getTutorProyects);
api.get('/getById/:id', proyectController.getById);
api.get('/getUserPendingProyect/:id', proyectController.getUserPendingProyect);
api.get('/getTutorUserProyects/:id', proyectController.getTutorUserProyects);
api.get('/getTeacherProyectWorks/:id/:idProyecto', proyectController.getTeacherProyectWorks);
api.get('/getUserProyectWorks/:id/:idProyecto', proyectController.getUserProyectWorks);
api.get('/getNotas/:id', proyectController.getNotas);
api.get('/getAdjuntosByNotas/:id', proyectController.getAdjuntosByNotas);

//POST METHODS
api.post('/form', proyectController.createForm);
api.post('/createUserProyect', proyectController.createUserProyect);
api.post('/createWork', proyectController.createWork);
api.post('/createAdjuntos', proyectController.createAdjuntos);

//PUT METHODS
api.put('/updateState', proyectController.updateState);
api.put('/actualizarProyecto', proyectController.actualizarProyecto);
api.put('/actualizarNota', proyectController.actualizarNota);

module.exports = api;
