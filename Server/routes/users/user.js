;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/user_controller');


//GET METHODS
api.get('/', crudController.welcome);
api.get('/getUserByEmail/:email', crudController.getUserByEmail);

//POST METHODS
api.post('/register', crudController.registerUser);
api.post('/login', crudController.loginUser);
api.post('/createUser', crudController.createUser);
api.post('/insertAllUsers', crudController.insertUsers);

//PUT METHODS
api.put('/updatePassword', crudController.modifyUser);


module.exports = api;
