;
const express = require('express');
const bodyParser = require('body-parser');

const app = express(),
    user_routes = require('./users');


app.use('/user', user_routes);

module.exports = app;

