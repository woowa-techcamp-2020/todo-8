let sql = require("../config/database.js");
let userModel = require("../models/user");

async function createUser(userParam) {
  let user = new userModel.User(userParam);

  return new Promise((resolve, reject) => {
    sql.query("insert into user set ?", user, function (err, res) {
      if (err) {
        return reject(err.code);
      }
      return resolve(res.insertId);
    });
  }).catch(function (err) {
    return err;
  });
}

async function getAllUsers() {
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
}

async function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.query(`select * from user WHERE id = ${id}`, function (err, res) {
      if (err) {
        reject(err.code);
      }
      resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}

// User.register = async function (newUser, result) {
//   return new Promise((resolve, reject) => {
//     sql.query("insert into user set ?", newUser, function (err, res) {
//       if (err) {
//         return reject(err.code);
//       }
//       return resolve(res.insertId);
//     });
//   }).catch(function (err) {
//     return err;
//   });
// };

// User.getAllUsers = async function () {
//   return new Promise((resolve, reject) => {
//     sql.query("select * from user", function (err, res) {
//       if (err) {
//         return reject(err.code);
//       }
//       return resolve(res);
//     });
//   }).catch(function (err) {
//     return err;
//   });
// };

module.exports = { createUser, getAllUsers, getUserById };
