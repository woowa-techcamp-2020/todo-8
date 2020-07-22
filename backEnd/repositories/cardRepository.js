let sql = require("../config/database.js");
let cardModel = require("../models/card");

async function createCard(cardParam) {
  let card = new cardModel.Card(cardParam);
  return new Promise((resolve, reject) => {
    sql.query("insert into card set ?", card, function (err, res) {
      if (err) {
        return reject(err.code);
      }
      return resolve(res.insertId);
    });
  }).catch(function (err) {
    return err;
  });
}

async function getAllCards() {
  return new Promise((resolve, reject) => {
    sql.query("select * from card", function (err, res) {
      if (err) {
        return reject(err.code);
      }
      return resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}

async function getCardById(id) {
  return new Promise((resolve, reject) => {
    sql.query(`select * from card WHERE id = ${id}`, function (err, res) {
      if (err) {
        reject(err.code);
      }
      resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}

module.exports = { createCard, getAllCards, getCardById };
