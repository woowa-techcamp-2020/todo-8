let db = require("../config/database.js");
const { Column } = require("../models/column");

async function createColumn(columnParam) {
  let column = new Column(columnParam);

  return new Promise((resolve, reject) => {
    db.query("insert into mydb.column set ?", column, function (err, res) {
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

async function getAllColumns() {
  return new Promise((resolve, reject) => {
    db.query("select * from mydb.column", function (err, res) {
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

async function getColumnById(id) {
  return new Promise((resolve, reject) => {
    db.query(`select * from mydb.column WHERE id = ${id}`, function (err, res) {
      if (err) {
        reject(err.code);
      }
      console.log(res + " record(s) selected");
      resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}

async function deleteColumn(id) {
  return new Promise((resolve, reject) => {
    db.query(`delete from mydb.column WHERE id = ?`, id, function (err, res) {
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

async function updateColumn(column) {
  var sql = `UPDATE mydb.column set title= ?, updated_at=? where id =?`;
  let data = [column.getTitle(), column.getUpdatedAt(), column.getId()];

  return new Promise((resolve, reject) => {
    db.query(sql, data, function (err, res) {
      if (err) {
        reject(err.code);
      }
      console.log(res + " record(s) updated");
      resolve(res);
    });
  }).catch(function (err) {
    return err;
  });
}
module.exports = {
  createColumn,
  getAllColumns,
  getColumnById,
  deleteColumn,
  updateColumn,
};
