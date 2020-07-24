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

async function getAllTodoById(id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *
      FROM 
          (select todoList.id as 'id', todoList.user_Id as 'user_id', mydb.column.id as 'column_id', mydb.column.title as 'column_title'
          from todoList
            left join mydb.column
              on todoList.id = mydb.column.todoList_id
              where todoList.user_id = ${id}) todo
      LEFT JOIN
          (select card.id as id, card.contents as contents, card.created_at as created_at, card.order 'order', card.column_id as column_id, mydb.column.title as column_todo, card.user_id as user_id, user.userId as userId, user.password as user_password
          from card 
            left join user 
              on user.id = card.user_id
            left join mydb.column 
              on card.column_id = mydb.column.id) card
      ON (todo.column_id = card.column_id);
            `,
      function (err, res) {
        if (err) {
          reject(err.code);
        }
        console.log("record(s) selected");
        resolve(res);
      }
    );
  }).catch(function (err) {
    return err;
  });
}

async function getTodoById(id) {
  return new Promise((resolve, reject) => {
    db.query(
      `select todoList.id as 'id', todoList.user_Id as 'user_id', mydb.column.id as 'column_id', mydb.column.title as 'column_title'
      from todoList
        left join mydb.column
          on todoList.id = mydb.column.todoList_id
          where todoList.user_id = ${id};
            `,
      function (err, res) {
        if (err) {
          reject(err.code);
        }
        console.log("record(s) selected");
        resolve(res);
      }
    );
  }).catch(function (err) {
    return err;
  });
}

async function getOnlyTodoById(id) {
  return new Promise((resolve, reject) => {
    db.query(`select * from todoList WHERE user_id = ${id}`, function (
      err,
      res
    ) {
      if (err) {
        reject(err.code);
      }
      console.log(res[0].id + " record(s) selected");
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
