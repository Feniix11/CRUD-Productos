const servicio = require("./servicios");

async function todos(req, res, next) {
  try {
    const productos = await servicio.todos();

    res.send({
      error: false,
      body: productos,
    });
  } catch (error) {
    next();
  }
}

module.exports = {
  todos,
};
