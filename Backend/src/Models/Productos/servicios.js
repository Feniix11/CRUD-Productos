const PRODUCTOS = "Productos";
const db = require("../../DB/mysql");

function todos() {
  return db.todos(PRODUCTOS);
}

module.exports = { todos };
