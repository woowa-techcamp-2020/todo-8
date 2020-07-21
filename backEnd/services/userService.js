var userModel = require("../models/user.js");
var userRepo = require("../repositories/userRepository.js");
const moment = require("moment");

/*
  request -> router -> service -> repo -> db -> CRUD models -> repo -> service -> router -> response
 */

function createUser(userParams) {
  userParams.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
  userParams.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  let userDTO = new userModel.User(userParams);
  let user = userRepo.createUser(userDTO);

  return user;
}
function getAllUsers() {
  let userList = userRepo.getAllUsers();
  return userList;
}

function getUserById(id) {
  let user = userRepo.getUserById(id);

  return user;
}
module.exports = { createUser, getAllUsers, getUserById };
