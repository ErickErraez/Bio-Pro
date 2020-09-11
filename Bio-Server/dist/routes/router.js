"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = express_1.Router();
//METODOS GET
exports.router.get('/', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Servidor Funcionando'
    });
});
//METODOS POST
//METODOS PUT
//METODOS DELETE
exports.default = exports.router;
