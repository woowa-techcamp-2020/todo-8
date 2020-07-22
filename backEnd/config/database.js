var mysql = require("mysql");
// var pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "13.125.156.139",
//   user: "0407chan",
//   password: "Cxr3044!@#",
//   database: "mydb",
//   debug: false,
// });

const connection = mysql.createConnection({
  host: "13.125.156.139",
  user: "0407chan",
  password: "Abcd123!",
  database: "mydb",
});
connection.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

module.exports = connection;
