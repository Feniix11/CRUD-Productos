const express = require("express");
const controlador = require("./controlador");
const { Authenticator } = require("../../Middleware/authenticator");
const router = express.Router();

router.get("/", Authenticator, controlador.todos);
router.post("/create");

module.exports = router;
