let db = require("../config/database.js");
let cardModel = require("../models/card");

async function createCard(cardParam) {
  let card = new cardModel.Card(cardParam);

  return new Promise((resolve, reject) => {
    db.query("insert into card set ?", card, function (err, res) {
      if (err) {
        return reject(err.code);
      }
      console.log(res.affectedRows + " record(s) interted");
      return resolve(res.insertId);
    });
  }).catch(function (err) {
    return err;
  });
}

async function getAllCards() {
  return new Promise((resolve, reject) => {
    db.query("select * from card", function (err, res) {
      if (err) {
        return reject(err.code);
      }
      console.log(res.affectedRows + " record(s) selected");
      return resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}

async function getCardById(id) {
  return new Promise((resolve, reject) => {
    db.query(`select * from card WHERE id = ${id}`, function (err, res) {
      if (err) {
        reject(err.code);
      }
      console.log(res.affectedRows + " record(s) selected");
      resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}

async function deleteCard(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    db.query(`delete from card WHERE id = ?`, id, function (err, res) {
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

async function updateCard(card) {
  var sql = `UPDATE card set cardId= ?, password=?,updated_at=? where id =?`;
  let data = [
    card.getCardId(),
    card.getPassword(),
    card.getUpdatedAt(),
    card.getId(),
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
  createCard,
  getAllCards,
  getCardById,
  deleteCard,
  updateCard,
};
