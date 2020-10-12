;
const express = require('express');
const api = express.Router(),
    authController = require('../../app/Http/Controllers/auth_controller');
middlewares = require('../../app/Http/Middelware/jwt_middleware');


//GET METHODS
api.post('/login', authController.login);
api.post('/changePassword', [middlewares.ensureToken], authController.changePassword);
api.post('/encriptar', authController.encriptarPassword);


module.exports = api;
