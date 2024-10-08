const config = require("../config");
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  // Genero el token con la informacion que le llega en Paylod y el tiempo de expiracion que llega
  // sino llega tiempo de expiracion, se usara "1h" por defecto
  const token = jwt.sign(payload, config.jwt.secret);

  return token;
}

module.exports = {
  generateToken,
};
