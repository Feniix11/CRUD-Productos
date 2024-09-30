const USUARIOS = "Usuarios";
// const db = require("../../DB/mysql");
const authen = require("../Authen/controlador");

async function agregar(body) {
  const usuario = {
    id: body.id,
    usuario: body.usuario,
    correo: body.correo,
    password: body.password,
  };

  // Aqui ya se agrego el usuario sino tiene un campo duplicado,
  // en este caso el id o el correo
  const respuesta = await db.agregar(USUARIOS, usuario);

  // Si no existe el id por el body, ingreso
  //  el que se acaba de crear

  return respuesta;
}

module.exports = {
  agregar,
};
