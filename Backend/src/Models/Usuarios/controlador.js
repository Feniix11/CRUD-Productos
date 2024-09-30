const servicio = require("./servicios");

async function agregar(req, res, next) {
  try {
    const items = await servicio.agregar(req.body);
    if (!req.body.id) {
      mensaje = "Usuario Guardado con exito";
    } else {
      mensaje = "Usuario Actualizado con exito";
    }
    res.send({
      error: false,
      body: mensaje,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      // Puedes ajustar este código según tu configuración de error
      res.status(409).send({
        // 409 Conflict
        error: true,
        message: "El usuario ya existe. Por favor, utiliza otro ID o correo.",
      });
    } else {
      // Manejar otros tipos de errores
      res.status(500).send({
        error: true,
        message: "Ocurrió un error al procesar la solicitud.",
      });
    }
  }
}

module.exports = {
  agregar,
};
