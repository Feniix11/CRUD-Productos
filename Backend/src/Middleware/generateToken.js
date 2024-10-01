const config = require("../config");
const jwt = require("jsonwebtoken");

function generateToken(payload, expireIn = "1h") {
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: expireIn, // Tambien se puede con variables de .env como config.expiresIn
  });

  return token;
}

module.exports = {
  generateToken,
};
