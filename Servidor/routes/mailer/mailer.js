;
const express = require('express');
const api = express.Router(),
    sendMail = require('../../app/Http/Controllers/mailer_controller');

api.post('/recuperarPassword', sendMail.sendMail);

module.exports = api;
