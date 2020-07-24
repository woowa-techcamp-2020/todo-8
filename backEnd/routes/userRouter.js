var express = require("express");
var router = express.Router();
var userService = require("../services/userService.js");

/* GET users listing. */
router.post("/users", async function (req, res, next) {
  var userData = req.body;
  var result = await userService.createUser(userData);
  res.json(result);
});

router.get("/users", async function (req, res, next) {
  var result = await userService.getAllUsers();
  res.json(result);
});

router.get("/users/:id", async function (req, res, next) {
  var result = await userService.getUserById(req.params.id);

  res.json(result);
});

router.delete("/users/:id", async function (req, res, next) {
  var result = await userService.deleteUser(req.params.id);
  res.json(result);
});

router.put("/users", async function (req, res, next) {
  let newUser = req.body.user;
  var result = await userService.updateUser(newUser);
  res.json(result);
});

module.exports = router;
