var express = require("express");
var router = express.Router();
var todoService = require("../services/todoService.js");

/* GET todos listing. */
router.post("/todo", async function (req, res, next) {
  var todoData = req.body;
  var result = await todoService.createTodo(todoData);
  res.json(result);
});

router.get("/todo", async function (req, res, next) {
  var result = await todoService.getAllTodos();
  res.json(result);
});

router.get("/todo/:id", async function (req, res, next) {
  var result = await todoService.getTodoById(req.params.id);

  res.json(result);
});

router.delete("/todo/:id", async function (req, res, next) {
  var result = await todoService.deleteTodo(req.params.id);
  res.json(result);
});

module.exports = router;
