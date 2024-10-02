const mysql = require("mysql2");
const config = require("../config");

let connection = null;

function confMYSQL() {
  connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });

  connection.connect((err) => {
    if (err) {
      console.log("[db err]", err);
      setTimeout(conMysql, 2000);
    } else {
      console.log("DB Conectada!!!");
    }
  });
}

confMYSQL();

function todos(tabla) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla}`, (error, resultado) => {
      return error ? reject(error) : resolve(resultado);
    });
  });
}

function agregar(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${tabla} SET ?`,
      [data, data],
      (error, resultado) => {
        return error ? reject(error) : resolve(resultado);
      }
    );
  });
}

function query(tabla, consulta) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${tabla} WHERE ?`,
      consulta,

      (error, resultado) => {
        return error ? reject(error) : resolve(resultado[0]);
      }
    );
  });
}

module.exports = {
  todos,
  agregar,
  query,
};
