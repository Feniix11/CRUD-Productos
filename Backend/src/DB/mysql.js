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

function create(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${tabla} SET ?`, data, (error, resultado) => {
      return error ? reject(error) : resolve(resultado);
    });
  });
}

function eliminateUser(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${tabla} WHERE email = ?`,
      [data],
      (error, resultado) => {
        return error ? reject(error) : resolve(resultado);
      }
    );
  });
}

function purchase(producto) {
  return new Promise((resolve, reject) => {
    try {
      const { SKU, name, quantity } = producto;
      connection.query(
        `SELECT funPurchase(?, ?, ?) AS result`,
        [SKU, name, quantity],
        (error, resultado) => {
          if (error) {
            return reject(error); // En caso de error, rechazar la promesa
          }
          // Accede al resultado del primer objeto en el array
          if (resultado.length > 0) {
            resolve(resultado[0].result); // Resolver con el mensaje de la función
          } else {
            reject(new Error("No se recibió resultado de la función")); // Manejo de caso sin resultado
          }
        }
      );
    } catch (error) {
      reject(error); // Rechazar la promesa si ocurre un error inesperado
    }
  });
}
// Obtengo informacion de algun elemento en la tabla que se designe
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
  create,
  eliminateUser,
  purchase,
  query,
};
