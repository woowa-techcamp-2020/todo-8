import MainService from "./lib/mainService.js";
import api from "./api/index.js";
import style from "../style/index.scss";
import userService from "./lib/userService.js";
import moment from "moment";

window.addEventListener("DOMContentLoaded", async () => {
  const todoBoard = document.querySelector("#app");

  var idField = document.createElement("input");
  var pwField = document.createElement("input");
  idField.placeholder = "ID";
  pwField.placeholder = "PW";
  var resgitser_btn = document.createElement("BUTTON");
  resgitser_btn.innerHTML = "회원가입";
  resgitser_btn.onclick = async function () {
    console.log("id=", idField.value, "pw=", pwField.value);
    await api.register({
      userId: idField.value,
      password: pwField.value,
    });
  };

  todoBoard.appendChild(idField);
  todoBoard.appendChild(pwField);
  todoBoard.appendChild(resgitser_btn);

  let menuButton = document.getElementById("menuButton");
  let menu = document.getElementById("nav");
  menuButton.addEventListener("click", async () => {
    if (menuButton.classList.contains("closed")) {
      menuButton.classList.remove("closed");
      menuButton.classList.add("opened");
    } else {
      menuButton.classList.remove("opened");
      menuButton.classList.add("closed");
    }
    if (menu.classList.contains("closed")) {
      menu.classList.remove("closed");
      menu.classList.add("opened");
      await addUsersToUnorderedList();
      menu.hidden = false;
    } else {
      menu.classList.remove("opened");
      menu.classList.add("closed");
      menu.hidden = true;
    }
  });
});

async function addUsersToUnorderedList() {
  let menuUnorderedEl = document.getElementById("menu-unordered-el");
  menuUnorderedEl.innerHTML = "";
  let userList = await api.getAllUsers();
  console.log("현재 사용자는 [", userList.length, "]명 입니다.");
  userList.forEach((user) => {
    let unorderedEl = document.createElement("li");
    let date = new Date(moment(user.created_at).format("YYYY-MM-DD HH:mm:ss"));
    unorderedEl.innerText = user.userId + "는 " + date + "에 가입했습니다.";
    menuUnorderedEl.appendChild(unorderedEl);
  });
}