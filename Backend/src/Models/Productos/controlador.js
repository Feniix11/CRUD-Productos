const db = require("../../DB/mysql");

const PRODUCTOS = "Productos";

async function todos(req, res) {
  try {
    const productos = await db.todos(PRODUCTOS);

    res.send({
      message: PRODUCTOS,
      body: productos,
    });
  } catch (error) {
    res.status(404).json({
      message: "No se pudo encontrar los productos",
    });
  }
}

async function create(req, res) {
  try {
    // Recibo los datos del producto y los guardo en una constante
    const newProduct = req.body;

    // Guardo los productos en la Tabla especificada y los valores que mando
    await db.create(PRODUCTOS, newProduct);

    // Respondo satisfactoriamente
    res.status(201).json({
      message: "El producto se agrego correctamente",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({
        message: "Este producto ya existe",
      });
    } else {
      res.status(500).json({
        message: "No se pudo completar la peticion correctamente",
      });
    }
  }
}

async function purchase(req, res) {
  try {
    const producto = req.body;

    const { quantity } = producto;

    if (!quantity) {
      return res.status(400).json({
        message: "No se indico la cantidad",
      });
    }

    //La respuesta viene en JSON/texto
    const resultadoJSON = await db.purchase(producto);

    // La parseo para poder utilizarla como objeto
    const resultado = JSON.parse(resultadoJSON);

    // Manejar el resultado basado en el código de estado
    if (resultado.status === "200") {
      return res.status(200).json({
        message: resultado.message,
      });
    } else if (resultado.status === "400" || resultado.status === "404") {
      return res.status(resultado.status).json({
        message: resultado.message,
      });
    } else {
      throw new Error("Inexplicable");
    }
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({
      message: "No se pudo completar la petición correctamente",
      error: error.message, // Muestra el mensaje de error
    });
  }
}

module.exports = {
  todos,
  create,
  purchase,
};
