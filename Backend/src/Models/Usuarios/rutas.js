const express = require("express");
const controlador = require("./controlador");
const { Authenticator } = require("../../Middleware/authenticator");
const router = express.Router();

// RUTS USERS

router.post("/login", controlador.loginUser);
router.post("/register", controlador.create);
router.delete("/eliminate", Authenticator, controlador.eliminate);

module.exports = router;
