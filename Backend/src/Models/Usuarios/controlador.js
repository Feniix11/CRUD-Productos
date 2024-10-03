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
    ...user,
    id: user.id,
    user: user.user,
    email: user.email,
    password: user.password,
    status: user.status,
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

async function eliminate(req, res) {
  // Se obtiene el rol del usuario
  const role = req.token.role;

  // Se valida el acceso por rol
  if (role !== "admin") {
    return res.status(401).json({
      error: true,
      message: "No tienes el rol correcto",
    });
  }
  try {
    const { email } = req.body;

    // Verifico si viene un email
    if (!email) {
      return res.status(400).json({
        message: "Email obligatorio",
      });
    }

    // consulto si existe en la base de datos
    const user = await db.query(USUARIOS, { email });

    if (!user) {
      // Si no se eliminó ninguna fila, el email no existía
      return res.status(404).json({ message: "El email no existe" });
    }

    // Elimino mi usuario encontrado anteriormente
    const resultado = await db.eliminateUser(USUARIOS, email);

    // Verifico si la eliminación afectó filas
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        message: "No se encontró un usuario con ese email para eliminar",
      });
    }
    res.status(200).json({
      message: "El usuario se elimino correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "ERROR en el servidor" });
  }
}

module.exports = {
  create,
  loginUser,
  eliminate,
};
