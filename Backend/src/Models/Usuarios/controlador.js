const db = require("../../DB/mysql");
const bcrypt = require("bcrypt");
const generateToken = require("../../Middleware/generateToken");

const USUARIOS = "Usuarios";

// Simulando una función de autenticación (como login)
async function loginUser(req, res) {
  const { email, password } = req.body;

  // Busca al usuario en la base de datos
  const user = await db.query(USUARIOS, { email });

  // Comparacion de las contraseña nueva y la hasheada en DB
  const descrypt = bcrypt.compareSync(password, user.password);

  // Validacion de datos de usuario para confirmar que son correctos
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
  const expiresIn = "5m";

  // Firmar el token
  const token = generateToken.generateToken(payload, expiresIn);

  // Devolver el token al cliente por header y body.
  res.header("Authorization", token);
  res.json({ token: token });
}

async function create(req, res) {
  try {
    // Declaro variable con el body
    const newUser = req.body;

    // Hasheo la nueva password
    const hash = await bcrypt.hash(newUser.password, 10);

    // Guardo en mi base de datos con password Hasheada
    await db.create(USUARIOS, { ...newUser, password: hash });

    res.status(201).json({
      message: "El usuario se agrego correctamente",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({
        message: "El email ya existe en el sistema",
      });
    } else {
      res.status(500).json({
        message: "ERROR!, No se pudo agregar el usuario",
      });
    }
  }
}

module.exports = {
  create,
  loginUser,
};
