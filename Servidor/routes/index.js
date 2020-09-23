;
const express = require('express');
const bodyParser = require('body-parser');

const app = express(),
    user_routes = require('./users');
    auth_routes = require('./auth');


app.use('/user', user_routes);
app.use('/auth', auth_routes);

module.exports = app;

