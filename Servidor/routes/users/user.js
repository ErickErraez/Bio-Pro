;
const express = require('express');
const api = express.Router(),
    userController = require('../../app/Http/Controllers/user_controller');


//GET METHODS
api.get('/', userController.welcome);
api.get('/getUser/:id', userController.getUserById);


module.exports = api;
