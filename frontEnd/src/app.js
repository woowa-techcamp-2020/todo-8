import MainService from "./lib/mainService.js";
import userService from "./lib/userService.js";
import cardService from "./lib/cardService.js";
import listService from "./lib/listService.js";

import indexStyle from "../style/index.scss";
import appStyle from "../style/app.scss";

import api from "./api/index.js";
import moment from "moment";
import User from "./components/user.js";
import store from "./store/index";
import todoService from "./lib/todoService";
import columnService from "./lib/columnService";

let currUser;

window.addEventListener("DOMContentLoaded", async () => {
  currUser = await api.User().getUserById({
    id: 26,
  });

  store.dispatch("setUser", currUser);

  columnService();

  console.log("현재 [", store.state.currUser.userId, "] 님이 접속했습니다");

  const todoBoard = document.querySelector("#app");
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  const cardServiceProvider = new cardService();
  const listServiceProvider = new listService();

  todoBoard.addEventListener("mousemove", cardServiceProvider.mousemove);
  todoBoard.addEventListener("mousedown", cardServiceProvider.mousedown);
  todoBoard.addEventListener("mouseup", cardServiceProvider.mouseup);
  todoBoard.addEventListener("mouseleave", cardServiceProvider.mouseleave);

  document.querySelectorAll(".list").forEach((list) => {
    listServiceProvider.addlistButtonsTo(list);
    listServiceProvider.hideAddCardModal(list);
    listServiceProvider.updateCardCount(list);
  });

  // 회원가입 테스트 화면
  var registerDiv = document.createElement("div");
  var idField = document.createElement("input");
  var pwField = document.createElement("input");
  idField.placeholder = "ID";
  pwField.placeholder = "PW";
  var resgitser_btn = document.createElement("BUTTON");
  resgitser_btn.innerHTML = "회원가입";

  // 회원가입
  resgitser_btn.onclick = async function () {
    let result = await api.User().createUser({
      userId: idField.value,
      password: pwField.value,
    });
    if (result.result == "ok") {
      store.dispatch("setUser", result.data);
      console.log("현재 유저는 [" + store.state.currUser.userId + "] 입니다.");
    } else if (result.result == "fail") {
      console.log(result.message);
    }
  };

  // 회원삭제
  var delete_btn = document.createElement("BUTTON");
  delete_btn.innerHTML = "회원삭제";
  delete_btn.onclick = async function () {
    if (idField.value.length == 0) {
      console.log("숫자를 입력해주세요");
    } else {
      await api.User().deleteUser({
        id: idField.value,
      });
    }
  };
  // 회원수정
  var update_btn = document.createElement("BUTTON");
  update_btn.innerHTML = "회원수정";
  update_btn.onclick = async function () {
    if (idField.value.length == 0) {
      console.log("숫자를 이름을 입력해주세요");
    } else {
      currUser.userId = idField.value;
      currUser.password = pwField.value;
      currUser = await api.User().updateUser(currUser);
    }
  };

  // 회원 조회
  var getUser_btn = document.createElement("BUTTON");
  getUser_btn.innerHTML = "현재회원조회";
  getUser_btn.onclick = async function () {
    currUser = await api.User().getUserById({
      id: store.state.currUser.id,
    });
    console.log("현재 유저는 [" + currUser.userId + "] 입니다.");
  };
  registerDiv.appendChild(idField);
  registerDiv.appendChild(pwField);

  registerDiv.appendChild(resgitser_btn);
  registerDiv.appendChild(update_btn);
  registerDiv.appendChild(getUser_btn);
  registerDiv.appendChild(delete_btn);

  // 카드 추가 테스트 화면

  var cardDiv = document.createElement("div");
  var cardBtn = document.createElement("BUTTON");
  cardBtn.innerHTML = "카드추가";
  cardBtn.onclick = async function () {
    console.log("이름=", idField.value);
    await api.Card().createCard({
      contents: idField.value,
      column_id: 1,
      user_id: currUser.id,
    });
    columnService();
  };
  cardDiv.appendChild(cardBtn);
  registerDiv.appendChild(cardDiv);
  todoBoard.appendChild(registerDiv);

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
  let userList = await api.User().getAllUsers();
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
