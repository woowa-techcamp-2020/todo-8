let db = require("../config/database.js");
let userModel = require("../models/user");

async function createUser(userParam) {
  let user = new userModel.User(userParam);

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

async function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.query("select * from user", function (err, res) {
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

async function deleteUser(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    db.query(`delete from user WHERE id = ?`, id, function (err, res) {
      if (err) {
        reject(err.code);
      }
      console.log(res.affectedRows + " record(s) deleted");
      resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}

async function updateUser(user) {
  var sql = `UPDATE user set userId= ?, password=?,updated_at=? where id =?`;
  let data = [
    user.getUserId(),
    user.getPassword(),
    user.getUpdatedAt(),
    user.getId(),
  ];

  return new Promise((resolve, reject) => {
    db.query(sql, data, function (err, res) {
      if (err) {
        reject(err.code);
      }
      console.log(res.affectedRows + " record(s) updated");
      resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
