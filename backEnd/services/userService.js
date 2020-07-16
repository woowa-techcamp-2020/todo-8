let userModel = require("../models/user");
let userRepo = require("../repositories/userRepository")

/*
  request -> router -> service -> repo -> db -> CRUD models -> repo -> service -> router -> response
 */
function createUser(userParams) {
  let userDTO = new userModel(userParams);

  let user = userRepo.createUser(userDTO);

  /* write user business logic */

  return user;
}

function getAllUsers() {
  let users = userRepo.getAllUsers();

  /* write user business logic */

  return users;
}

function getUserById(id) {
  let user = userRepo.getUserById(id);

  /* write user business logic */

  return user;
}

module.exports = { createUser, getAllUsers, getUserById };
