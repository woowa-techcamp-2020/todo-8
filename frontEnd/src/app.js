import MainService from "./lib/mainService.js";
import api from "./api/index.js";
import userService from "./lib/userService.js";
import moment from "moment";

console.log("what's different? what? hello?");
window.addEventListener("DOMContentLoaded", async () => {
  const targetEl = document.querySelector("#app");

  var idField = document.createElement("input");
  var pwField = document.createElement("input");
  idField.innerHTML = "ID";
  pwField.innerHTML = "PW";
  var resgitser_btn = document.createElement("BUTTON");
  resgitser_btn.innerHTML = "회원가입";
  resgitser_btn.onclick = async function () {
    console.log("id=", idField.value, "pw=", pwField.value);
    await api.register({
      userId: idField.value,
      password: pwField.value,
    });
  };

  var getAllUsers_btn = document.createElement("BUTTON");
  getAllUsers_btn.innerHTML = "사용자 조회하기";
  var userList = [];
  getAllUsers_btn.onclick = async function () {
    userList = await api.getAllUsers();
    console.log("현재 사용자는 [", userList.length, "]명 입니다.");
    userList.forEach((user) => {
      let div = document.createElement("div");
      let date = new Date(
        moment(user.created_at).format("YYYY-MM-DD HH:mm:ss")
      );
      div.innerHTML =
        user.userId +
        "는 " +
        (date.getMonth() + 1) +
        "월 " +
        date.getDate() +
        "일 에 가입했습니다.";
      targetEl.appendChild(div);
    });
  };

  targetEl.appendChild(idField);
  targetEl.appendChild(pwField);
  targetEl.appendChild(resgitser_btn);
  targetEl.appendChild(getAllUsers_btn);
});
