const express = require("express");
const controlador = require("./controlador");
const router = express.Router();

router.get("/create", controlador.todos);

module.exports = router;
