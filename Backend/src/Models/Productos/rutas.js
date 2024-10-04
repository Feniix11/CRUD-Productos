const express = require("express");
const controlador = require("./controlador");
const { Authenticator } = require("../../Middleware/authenticator");
const router = express.Router();

// RUTS PRODUCTS

router.get("/", Authenticator, controlador.todos);
router.post("/create", controlador.create);
router.put("/purchase", controlador.purchase);

module.exports = router;
