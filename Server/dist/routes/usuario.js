"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const useRoute = express_1.Router();
useRoute.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'funcionando'
    });
});
exports.default = useRoute;
