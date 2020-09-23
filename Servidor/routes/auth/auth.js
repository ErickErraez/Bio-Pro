;
const express = require('express');
const api = express.Router(),
    authController = require('../../app/Http/Controllers/auth_controller');


//GET METHODS
api.post('/login', authController.login);
api.post('/getUser/:id', authController.changePassword);
api.post('/encriptar', authController.encriptarPassword);


module.exports = api;
