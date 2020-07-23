import api from "../api/index";
import Column from "../components/Column";
import store from "../store/index";

export default class listService {
  constructor() {
    this.addCardModalShown = false;
  }

  addlistButtonsTo(todoList) {
    const listButtons = document.createElement("span");
    listButtons.classList.add("listButtons");

    const addCardButton = document.createElement("button");
    addCardButton.innerText = "ADD";

    const showListOptionButton = document.createElement("button");
    showListOptionButton.innerText = "OPTIONS";

    let addCardModalTextarea = document.createElement("textarea");
    addCardModalTextarea.classList.add("add-card-modal-textarea");
    addCardModalTextarea.placeholder = "새로운 카드의 내용을 입력하세요.";
    let addCardModalAddButton = document.createElement("button");
    addCardModalAddButton.classList.add("add-card-modal-add-button");
    addCardModalAddButton.innerText = "Add";
    let addCardModalCancelButton = document.createElement("button");
    addCardModalCancelButton.innerText = "Cancel";
    addCardModalCancelButton.classList.add("add-card-modal-cancel-button");

    let addCardModal = document.createElement("div");
    addCardModal.classList.add("add-card-modal");
    addCardModal.appendChild(addCardModalTextarea);
    addCardModal.appendChild(addCardModalAddButton);
    addCardModal.appendChild(addCardModalCancelButton);

    listButtons.appendChild(addCardButton);
    listButtons.appendChild(showListOptionButton);
    todoList.querySelector(".start").append(listButtons);
    todoList.insertBefore(
      addCardModal,
      todoList.querySelector(".start").nextSibling
    );

    addCardButton.addEventListener(
      "click",
      () => {
        if (this.addCardModalShown) {
          this.hideAddCardModal(todoList);
        } else {
          this.showAddCardModal(todoList);
        }
      },
      false
    );

    addCardModalCancelButton.addEventListener(
      "click",
      () => {
        this.hideAddCardModal(todoList);
      },
      false
    );

    addCardModalAddButton.addEventListener(
      "click",
      () => {
        this.addCard(addCardModalTextarea.value, todoList);
      },
      false
    );
  }

  showAddCardModal(todoList) {
    this.addCardModalShown = true;
    todoList.getElementsByClassName("add-card-modal").forEach((element) => {
      element.style.display = "";
    });
  }

  async addCard(content, todoList) {
    if (content === "") return;

    this.hideAddCardModal(todoList, true);

    let newCard = document.createElement("li");
    newCard.classList.add("card");
    newCard.innerHTML = `<p>${content}</p>`;

    console.log("여기에 DB로 쏠 코드 들어가면 됨.", content);

    await api.Card().createCard({
      contents: content,
      column_id: 1,
      user_id: store.state.currUser.id,
    });

    todoList.insertBefore(
      newCard,
      todoList.querySelector(".add-card-modal").nextSibling
    );
  }

  hideAddCardModal(todoList, deleteOk = false) {
    let ta = todoList.querySelector(".add-card-modal-textarea");
    console.log(todoList);
    if (!deleteOk && ta.value) {
      deleteOk = confirm(
        "입력되신 내용이 저장되지 않았습니다. 계속하시겠습니까?"
      );
    } else {
      deleteOk = true;
    }
    if (deleteOk) {
      ta.value = "";
      todoList.getElementsByClassName("add-card-modal").forEach((element) => {
        element.style.display = "none";
      });
      this.addCardModalShown = false;
    }
  }
}
