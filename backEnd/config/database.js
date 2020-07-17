"user strict";

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "13.125.156.139",
  user: "0407chan",
  password: "Cxr3044!@#",
  database: "mydb",
});
connection.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

module.exports = connection;
