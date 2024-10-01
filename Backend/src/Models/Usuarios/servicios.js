const USUARIOS = "Usuarios";
const bcrypt = require("bcrypt");
const db = require("../../DB/mysql");

async function agregar(body) {
  const passwordHash = bcrypt.hashSync(body.password, 5);

  console.log("HASH: ", passwordHash);
  const usuario = {
    id: body.id,
    user: body.user,
    email: body.email,
    password: passwordHash,
  };

  // Aqui ya se agrego el usuario sino tiene un campo duplicado,
  // en este caso el id o el correo
  const respuesta = await db.agregar(USUARIOS, usuario);
  console.log("RESPUESTA: ", respuesta);

  // Si no existe el id por el body, ingreso
  //  el que se acaba de crear

  return respuesta;
}

module.exports = {
  agregar,
};
