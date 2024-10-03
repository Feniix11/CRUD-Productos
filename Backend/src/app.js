const express = require("express");
const app = express();
const config = require("./config");
const morgan = require("morgan");

const productos = require("./Models/Productos/rutas");
const usuarios = require("./Models/Usuarios/rutas");
const { Authenticator } = require("./Middleware/authenticator");

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));

// CONFIGURACION
app.set("port", config.app.port);

// RUTAS
app.use("/productos", productos);
app.use("/usuarios", usuarios);

module.exports = app;
