;
const express = require('express');
const api = express.Router(),
    userController = require('../../app/Http/Controllers/user_controller');


//GET METHODS
api.get('/', userController.welcome);
api.get('/getUser/:id', userController.getUserById);
api.post('/foto', userController.userFoto);
api.post('/userFoto', userController.updateUser);


module.exports = api;