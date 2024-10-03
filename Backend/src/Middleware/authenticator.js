const jwt = require("jsonwebtoken");

async function Authenticator(req, res, next) {
  // Guardo el Token que el cliente me manda por Header
  const token = req.header("Authorization");

  // Valido si existe un token o viene vacio
  if (!token) {
    return res.status(404).json({ message: "No existe token" });
  }

  try {
    // Separo el token porque viene como un arreglo
    const tokenSplit = token.split(" ")[1];

    // Declaro mi llave secreta
    const secret = process.env.JWT_SECRET;

    const decoded = jwt.verify(tokenSplit, secret); // Decodificar el token

    req.token = decoded;
    //Continuo ejecucion normal
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no valido o expirado" });
  }
}

module.exports = {
  Authenticator,
};
