const bcrypt = require("bcrypt");
const db = require("../../DB/mysql");

async function agregar(data) {
  const authData = {
    id: data.id,
  };

  if (data.usuario) {
    authData.usuario = data.usuario;
  }

  // Aqui se Hashea el password al crear un usuario
  if (data.password) {
    authData.password = await bcrypt.hash(data.password, 5);
  }

  return db.agregar(AUTH, authData);
}

module.exports = {
  agregar,
};
