import MainService from "./lib/mainService.js";
import api from "./api/index.js";
import style from "../style/index.scss";

window.addEventListener("DOMContentLoaded", async () => {
  // const targetEl = document.querySelector("#app");
  // const service = new MainService({ targetEl });
  // const datalist = [1, 2, 3, 4, [5, 6, [7]]];
  // service.init(datalist.flat(2));

  // const userList = await api.getAllUsers();
  // console.log("왜안돼 ㅠㅠ", userList);
  // targetEl.innerHTML += `datalist is ${service.dataList} Yes`;
  // userList.forEach((element) => {
  //   targetEl.innerHTML += `id= ${element.id}, name= ${element.name}`;
  // });

  document.getElementById("menuButton").addEventListener("click", () => {
    let menuButton = document.getElementById("menuButton");
    let menu = document.getElementById("nav");
    console.log(menuButton);
    console.log(menu);
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
      menu.hidden = false;
    } else {
      menu.classList.remove("opened");
      menu.classList.add("closed");
      menu.hidden = true;
    }
  });
});
