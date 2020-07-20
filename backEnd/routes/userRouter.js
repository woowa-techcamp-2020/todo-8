var express = require("express");
var router = express.Router();
var userService = require("../services/userService.js");

/* GET users listing. */
router.post("/users", async function (req, res, next) {
  var userData = req.body;
  var user = await userService.createUser(userData);
  if (user === "ER_DUP_ENTRY") {
    res.json({ result: "duplicate", message: "이미 존재하는 아이디입니다" });
  } else {
    res.json({ result: "ok", message: "회원가입 성공" });
  }
});

router.get("/users", async function (req, res, next) {
  var userList = await userService.getAllUsers();
  res.json({ result: "ok", userList: userList });
});

router.get("/users/:id", async function (req, res, next) {
  var user = await userService.getUserById(req.params.id);
  res.json({ result: "ok", user: user });
});

module.exports = router;
