import MainService from "./lib/mainService.js";
import api from "./api/index.js";

console.log("what's different? what? hello?");
window.addEventListener("DOMContentLoaded", async () => {
  // const targetEl = document.querySelector("#app");
  // const service = new MainService({targetEl});
  // const datalist = [1, 2, 3, 4, [5, 6, [7]]];
  // service.init(datalist.flat(2));
  //
  // const userList = await api.getAllUsers();
  // console.log("왜안돼 ㅠㅠ", userList);
  // targetEl.innerHTML += `datalist is ${service.dataList} Yes`;
  // userList.forEach((element) => {
  //   targetEl.innerHTML += `id= ${element.id}, name= ${element.name}`;
  // });

  const targetEl = document.querySelector("#app");
  const userList = await api.getAllUsers();
  userList.forEach((element) => {
    targetEl.innerHTML += `id= ${element.id}, name= ${element.name}<br>`;
  });
});