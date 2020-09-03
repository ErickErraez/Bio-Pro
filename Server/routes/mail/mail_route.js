;
const express = require('express');
const api = express.Router(),
    sendMail = require('../../app/Http/Mailer/index');

api.post('/enviar',sendMail.sendMail);

module.exports = api;
