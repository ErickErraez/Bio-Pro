;
const express = require('express');
const api = express.Router(),
    authController = require('../../app/Http/Controllers/auth_controller');
middlewares = require('../../app/Http/Middelware/jwt_middleware');


//GET METHODS
api.post('/login', authController.login);
api.post('/changePassword', [middlewares.ensureToken], authController.changePassword);
api.post('/encriptar', authController.encriptarPassword);
api.post('/updateUser', [middlewares.ensureToken], authController.updateUser);
api.post('/getData', [middlewares.ensureToken], authController.getData);
api.post('/saveFile', [middlewares.ensureToken], authController.saveFile);

api.get('/getUsers', [middlewares.ensureToken], authController.getUsers);

api.get('/getTimbrada/:idBio',  authController.getTimbradas);

module.exports = api;
