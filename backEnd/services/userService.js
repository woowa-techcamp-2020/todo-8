var userModel = require("../models/user.js");
const moment = require("moment");

async function register(user) {
  user.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
  user.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(user);
  const res = await userModel.User.register(user);
  return res;
}
async function getAllUsers() {
  const res = await userModel.User.getAllUsers();
  return res;
}
module.exports = { register, getAllUsers };
