;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/admin_controller');


//GET METHODS
api.get('/getConfiguraciones', crudController.getConfiguraciones);
api.get('/getNotesAdmin/:tipo', crudController.getNotesAdmin);
api.get('/getPeriodos', crudController.getPeriodos);

//POST METHODS
api.post('/createCategory', crudController.createCategory);
api.post('/createPeriodo', crudController.createPeriodo);

//PUT METHODS
api.put('/updateConfiguraciones', crudController.updateConfiguraciones);
api.put('/updateProyecto', crudController.assignTutor);
api.put('/updateCategory', crudController.updateCategory);
api.put('/updateDate', crudController.updateDate);
api.put('/updatePeriodo', crudController.updatePeriodo);

//DELETE METHODS
api.delete('/deleteCategory/:id', crudController.deleteCategory);

module.exports = api;
