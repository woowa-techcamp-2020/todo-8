var express = require("express");
var router = express.Router();
var userService = require("../services/userService.js");

/* GET users listing. */
router.post("/register", async function (req, res, next) {
  var user = req.body;
  var result = await userService.register(user);
  console.log("결과", result);
  if (result === "ER_DUP_ENTRY") {
    res.json({ result: "duplicate", message: "이미 존재하는 아이디입니다" });
  } else {
    res.json({ result: "ok", message: "회원가입 성공" });
  }
});

router.get("/getAllUsers", async function (req, res, next) {
  var userList = await userService.getAllUsers();
  res.json({ result: "ok", userList: userList });
});

module.exports = router;
