let db = require("../utils/database")
let userModel = require("../models/user");

function createUser(userParam) {
  let user = new userModel(userParam);

  return new Promise((resolve, reject) => {
    db.query("insert into user set ?", user, function (err, res) {
      if (err) {
        return reject(err.code);
      }
      return resolve(res.insertId);
    });
  }).catch(function (err) {
    return err;
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.query("select * from user", function (err, res) {
      if (err) {
        reject(err.code);
      }
      resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}

function getUserById(id) {
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

module.exports = { createUser, getAllUsers, getUserById };