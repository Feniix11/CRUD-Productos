const express = require("express");
const controlador = require("./controlador");
const router = express.Router();

router.post("/login", controlador.loginUser);
router.post("/crear", controlador.agregar);

module.exports = router;
