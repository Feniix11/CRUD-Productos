const express = require("express");
const controlador = require("./controlador");
const { Authenticator } = require("../../Middleware/authenticator");
const router = express.Router();

router.post("/login", controlador.loginUser);
router.post("/create", controlador.create);

module.exports = router;
