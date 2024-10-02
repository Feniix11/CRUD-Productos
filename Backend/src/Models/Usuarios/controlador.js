const db = require("../../DB/mysql");
const bcrypt = require("bcrypt");
const servicio = require("./servicios");
const generateToken = require("../../Middleware/generateToken");

const USUARIOS = "Usuarios";

// Simulando una función de autenticación (como login)
async function loginUser(req, res) {
  const { email, password } = req.body;

  // Busca al usuario en la base de datos
  const user = await db.query(USUARIOS, { email });

  // Comparacion de las contraseña nueva y la hasheada en DB
  const descrypt = bcrypt.compareSync(password, user.password);
  if (!user || !descrypt) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Crear un payload para el token (información que quieres incluir en el token)
  const payload = {
    id: user.id,
    user: user.user,
    email: user.email,
    password: user.password,
  };

  // Tiempo de expiracion de Token
  const expireIn = "1m";

  // Firmar el token
  const token = generateToken.generateToken(payload, expireIn);

  // Devolver el token al cliente por header y body.
  res.header("Authorization", token);
  res.json({ token: token });
}

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
  loginUser,
};
