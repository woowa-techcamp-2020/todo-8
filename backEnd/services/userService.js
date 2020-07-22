var userRepo = require("../repositories/userRepository.js");
const moment = require("moment");
const { User } = require("../models/user.js");

/*
  request -> router -> service -> repo -> db -> CRUD models -> repo -> service -> router -> response
 */

async function createUser(userParams) {
  userParams.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
  userParams.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  let userDTO = new User(userParams);

  let res = await userRepo.createUser(userDTO);
  if (res === "ER_DUP_ENTRY") {
    return { result: "fail", message: "이미 존재하는 유저입니다." };
  } else {
    let user = await userRepo.getUserById(res);
    return { result: "ok", message: "가입 완료", user: user[0] };
  }
}
async function getAllUsers() {
  let userList = await userRepo.getAllUsers();
  if (userList.length == 0) {
    return { result: "fail", message: "데이터가 존재하지 않습니다." };
  } else {
    return { result: "ok", message: "검색 완료", userList: userList };
  }
}

async function getUserById(id) {
  let user = await userRepo.getUserById(id);
  if (user.length == 0) {
    return { result: "fail", message: "존재하지 않는 유저입니다." };
  } else {
    return { result: "ok", message: "검색 완료", user: user[0] };
  }
}

async function deleteUser(id) {
  let user = await userRepo.getUserById(id);

  if (user.length == 0) {
    return { result: "fail", message: "존재하지 않는 유저입니다." };
  } else {
    let userId = user[0].userId;
    userRepo.deleteUser(id);
    return { result: "ok", message: `${userId} 을 삭제했습니다.` };
  }
}

async function updateUser(newUser) {
  let user = await userRepo.getUserById(newUser.id);

  if (user.length == 0) {
    return { result: "fail", message: "존재하지 않는 유저입니다." };
  } else {
    newUser.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    let userDTO = new User(newUser);

    await userRepo.updateUser(userDTO);

    let user = await userRepo.getUserById(userDTO.getId());

    return {
      result: "ok",
      message: `${userDTO.getUserId()} 정보를 수정했습니다.`,
      user: user[0],
    };
  }
}
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
