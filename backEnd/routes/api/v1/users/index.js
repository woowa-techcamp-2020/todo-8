var express = require("express");
var router = express.Router();

var UserService = require("../../../../services/userService");

// POST /api/v1/users : 유저 데이터 생성할 때
router.post("/", async function (req, res, next) {
  var userData = req.body;
  var user = await UserService.createUser(userData);

  res.json(user);
});

// GET /api/v1/users : 모든 유저를 조회할 때
router.get("/", async function (req, res, next) {
  var userList = await UserService.getAllUsers();

  res.json(userList);
});

// GET api/v1/users/:id : 해당 id를 가진 유저를 조회할
router.get("/:id", async function (req, res, next) {
  var user = await UserService.getUserById(req.params.id);

  res.json(user);
});

module.exports = router;
