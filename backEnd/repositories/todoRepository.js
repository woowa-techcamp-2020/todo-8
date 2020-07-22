let db = require("../config/database.js");
let todoModel = require("../models/todo");

async function createTodo(todoParam) {
  let todo = new todoModel.Todo(todoParam);

  return new Promise((resolve, reject) => {
    db.query("insert into todo set ?", todo, function (err, res) {
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

async function getAllTodos() {
  return new Promise((resolve, reject) => {
    db.query("select * from todo", function (err, res) {
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

async function getTodoById(id) {
  return new Promise((resolve, reject) => {
    db.query(`select * from todo WHERE id = ${id}`, function (err, res) {
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

async function deleteTodo(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    db.query(`delete from todo WHERE id = ?`, id, function (err, res) {
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

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  deleteTodo,
};
