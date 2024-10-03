const express = require("express");
const controlador = require("./controlador");
const { Authenticator } = require("../../Middleware/authenticator");
const router = express.Router();

// RUTS PRODUCTS

router.get("/", controlador.todos);
router.post("/create", Authenticator, controlador.create);
router.put("/purchase", controlador.purchase);

module.exports = router;
