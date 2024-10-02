const jwt = require("jsonwebtoken");

async function Authenticator(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(404).json({ message: "No existe token" });
  }

  try {
    const tokenSplit = token.split(" ")[0];
    const secret = process.env.JWT_SECRET;

    const verify = jwt.verify(tokenSplit, secret);

    console.log(verify);

    next();
  } catch (error) {
    res.status(401).json({ message: "BAILASTE" });
  }
}

module.exports = {
  Authenticator,
};
