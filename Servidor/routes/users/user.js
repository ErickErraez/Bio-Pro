;
const express = require('express');
const api = express.Router(),
    userController = require('../../app/Http/Controllers/user_controller');
middlewares = require('../../app/Http/Middelware/jwt_middleware');


//GET METHODS
api.get('/', userController.welcome);
api.get('/getUser/:id', userController.getUserById);
api.get('/getUserEmail/:email', userController.getUserByEmail);
api.get('/getAdmin/:idRoles', userController.getAdmin)
// api.post('/foto', [middlewares.ensureToken, middlewares.ensureTokenAdmin], userController.userFoto);
api.post('/foto', [middlewares.ensureToken], userController.userFoto);
api.post('/userFoto', [middlewares.ensureToken], userController.updateUser);
api.post('/userPassword', userController.updateUserForgot);
api.post('/addUSer', [middlewares.ensureToken], userController.addUSer)
api.post('/justification', [middlewares.ensureToken], userController.userJustification);
api.post('/justificationTimbrada', [middlewares.ensureToken], userController.updateTimbrada);


module.exports = api;
