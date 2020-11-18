;
const express = require('express');
const api = express.Router(),
    sendMail = require('../../app/Http/Controllers/mailer_controller');

api.post('/enviar', sendMail.sendMail);

module.exports = api;
