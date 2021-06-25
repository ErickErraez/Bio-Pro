;
const express = require('express');
const bodyParser = require('body-parser');

const app = express(),
    user_routes = require('./users');
auth_routes = require('./auth');
mailer_routes = require('./mailer');


app.use('/user', user_routes);
app.use('/auth', auth_routes);
app.use('/mail', mailer_routes);

module.exports = app;

