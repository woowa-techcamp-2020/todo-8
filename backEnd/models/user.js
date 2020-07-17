"user strict";

var sql = require("../config/database.js");

var User = function (user) {
  this.userId = user.userId;
  this.password = user.password;
};

User.register = async function (newUser, result) {
  return new Promise((resolve, reject) => {
    sql.query("insert into user set ?", newUser, function (err, res) {
      if (err) {
        return reject(err.code);
      }
      return resolve(res.insertId);
    });
  }).catch(function (err) {
    return err;
  });
};

User.getAllUsers = async function () {
  return new Promise((resolve, reject) => {
    sql.query("select * from user", function (err, res) {
      if (err) {
        return reject(err.code);
      }
      return resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
};

module.exports = { User };
