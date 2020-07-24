var todoRepo = require("../repositories/todoRepository.js");
const moment = require("moment");
const { Todo } = require("../models/todo.js");

/*
  request -> router -> service -> repo -> db -> CRUD models -> repo -> service -> router -> response
 */

async function createTodo(todoParams) {
  todoParams.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
  todoParams.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  let todoDTO = new Todo(todoParams);

  let res = await todoRepo.createTodo(todoDTO);
  if (res === "ER_DUP_ENTRY") {
    return { result: "fail", message: "이미 존재하는 카드입니다." };
  } else {
    let todo = await todoRepo.getTodoById(res);
    return { result: "ok", message: "추가 완료", data: todo[0] };
  }
}
async function getAllTodos() {
  let todoList = await todoRepo.getAllTodos();
  if (todoList.length == 0) {
    return { result: "fail", message: "데이터가 존재하지 않습니다." };
  } else {
    return { result: "ok", message: "검색 완료", data: todoList };
  }
}

async function getTodoById(id) {
  let todo = await todoRepo.getTodoById(id);
  if (todo.length == 0) {
    return { result: "fail", message: "존재하지 않는 카드입니다." };
  } else {
    return { result: "ok", message: "검색 완료", data: todo };
  }
}

async function deleteTodo(id) {
  let todo = await todoRepo.getTodoById(id);

  if (todo.length == 0) {
    return { result: "fail", message: "존재하지 않는 카드입니다." };
  } else {
    let todoId = todo[0].todoId;
    todoRepo.deleteTodo(id);
    return { result: "ok", message: `${todoId} 을 삭제했습니다.` };
  }
}

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  deleteTodo,
};
