import MainService from "./lib/mainService.js";
import userService from "./lib/userService.js";
import dragService from "./lib/dragService.js";

import indexStyle from "../style/index.scss";
import appStyle from "../style/app.scss";

import api from "./api/index.js";
import moment from "moment";
import card from "./components/card.js";

window.addEventListener("DOMContentLoaded", async () => {
  const todoBoard = document.querySelector("#app");
  const dragAndDrop = new dragService({ todoBoard });
  todoBoard.addEventListener("mousemove", dragAndDrop.mousemove);
  todoBoard.addEventListener("mousedown", dragAndDrop.mousedown);
  todoBoard.addEventListener("mouseup", dragAndDrop.mouseup);
  todoBoard.addEventListener("mouseleave", dragAndDrop.mouseleave);

  // var idField = document.createElement("input");
  // var pwField = document.createElement("input");
  // idField.placeholder = "ID";
  // pwField.placeholder = "PW";
  // var resgitser_btn = document.createElement("BUTTON");
  // resgitser_btn.innerHTML = "회원가입";
  // resgitser_btn.onclick = async function () {
  //   console.log("id=", idField.value, "pw=", pwField.value);
  //   await api.register({
  //     userId: idField.value,
  //     password: pwField.value,
  //   });
  // };

  // todoBoard.appendChild(idField);
  // todoBoard.appendChild(pwField);
  // todoBoard.appendChild(resgitser_btn);

  let menuButton = document.getElementById("menuButton");
  let sidebar = document.getElementById("sidebar");
  menuButton.addEventListener("click", async () => {
    if (menuButton.classList.contains("closed")) {
      menuButton.classList.remove("closed");
      menuButton.classList.add("opened");
    } else {
      menuButton.classList.remove("opened");
      menuButton.classList.add("closed");
    }
    if (sidebar.classList.contains("closed")) {
      sidebar.classList.remove("closed");
      sidebar.classList.add("opened");
      await addActivityLogToActivityLogList();
      sidebar.hidden = false;
    } else {
      sidebar.classList.remove("opened");
      sidebar.classList.add("closed");
      sidebar.hidden = true;
    }
  });
});

async function addActivityLogToActivityLogList() {
  let activityLogList = document.getElementById("activity-log-list");
  activityLogList.classList.add("activityLog");
  activityLogList.innerHTML = "";
  let userList = await api.getAllUsers();
  userList.reverse();
  console.log("현재 사용자는 [", userList.length, "]명 입니다.");
  userList.forEach((user) => {
    let activityLog = document.createElement("li");
    activityLog.classList.add("activityLog");
    let date = new Date(moment(user.created_at).format("YYYY-MM-DD HH:mm:ss"));
    activityLog.innerText = user.userId + "는 " + date + "에 가입했습니다.";
    activityLogList.appendChild(activityLog);
  });
}