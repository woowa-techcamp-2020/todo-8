import Store from "../store/index";
import Api from "../api/index";
import columnService from "../lib/columnService";

let hover = document.querySelector(".hover");
let shift = { x: 0, y: 0 };
let clicks = 0,
  delay = 200;

function isBefore(element1, element2) {
  if (element2.parentNode === element1.parentNode) {
    for (
      let prevEl = element1.previousSibling;
      prevEl;
      prevEl = prevEl.previousSibling
    ) {
      if (prevEl === element2) {
        return true;
      }
    }
  }
  return false;
}

export default class cardService {
  constructor() {
    this.clicked = false;
    this.hoveringElement = undefined;
    this.targetElement = undefined;
    this.currTarget = undefined;
  }

  pointermove(event) {
    // 클릭되지 않았고, 호버링 중인 element가 없다면 아무 것도 하지 않는다.
    if (!this.clicked || !this.hoveringElement) return;

    // pointerEvent 안의 pageX, pageY를 가져온다.
    const { pageX, pageY } = event;

    // 잠시 현재 hover element를 가리고 현재 좌표의 element를 가져온다
    hover.hidden = true;
    const elemBelow = document.elementFromPoint(pageX, pageY);
    if(!elemBelow) return;
    const li = elemBelow.closest("li"); // 가장 가까운 리스트
    const ul = elemBelow.closest("ul"); // 가장 가까운 카드
    hover.hidden = false;

    // 마우스가 움직일 때마다 호버가 마우스를 따라다니도록 만드는 것.
    hover.style.left = pageX - shift["x"] + "px";
    hover.style.top = pageY - shift["y"] - 10 + "px";

    // 어떤 카드 위에 있지 않다면
    if (!li) {
      // 그러나 어떤 리스트 안에 있다면
      if (ul) {
        // 그 리스트의 첫 아이템 start를 가져와서
        const start = ul.querySelector(".start");
        // 상단 영역을 top로 지정. 78이 나옴
        const { top } = start.getBoundingClientRect();
        // 만약 지금 마우스의 위치가 start보다 위에 있다면
        if (top > pageY) {
          // 현재 끌고 있는 엘리먼츠를 start 카드 바로 다음에 넣는다. -> cardlist 처음에 넣는다
          ul.querySelector(".card-list-wrapper").prepend(this.targetElement);
          // 만약 지금 마우스의 위치가 start 아래에 있다면
        } else {
          // 리스트 마지막에 넣는다.
          ul.childNodes[3].appendChild(this.targetElement);
          /**
           *
           * 여기서 무브 이벤트 줘야함
           */
        }
      }
    }
    // 그게 아니라 어떤 카드 위에 있다면, 그리고 그 카드 이름이 start가 아니고 지금 엘리먼츠가 li 전에 있다면
    else if (li.className !== "start" && isBefore(this.targetElement, li)) {
      // li 전에 targetElement를 넣는다.
      li.parentNode.insertBefore(this.targetElement, li);
      // start 카드 위에 있다면
    } else if (li.className === "start" && li.parentNode) {
      // start 카드 다음에 넣는다.
      ul.querySelector(".card-list-wrapper").prepend(this.targetElement);
      // li.parentNode.insertBefore(this.targetElement, li);
    } else if (!ul) {
    }
  }

  pointerdown(event) {
    this.currTarget = event.target;
    let pointerDownedCard = event.target.closest("li");
    if (pointerDownedCard === null) return;
    let pointerDownedCardContent = pointerDownedCard.querySelector("div");
    event.preventDefault();
    clicks++;
    setTimeout(function () {
      clicks = 0;
    }, delay);

    if (clicks >= 2) {
      if (pointerDownedCard.className === "start") {
        pointerDownedCardContent = pointerDownedCard.querySelector(".list-title");
        let column_id = event.target.closest("li").parentNode.id.split("-")[1];
        let input = prompt(`Edit "${pointerDownedCardContent.innerText}" to...`);
        if (input) {
          let params = {
            column_id,
            new_title: input,
          };
          Api.Column().updateColumn(params);
          pointerDownedCardContent.innerText = input;
        }
        clicks = 0;
      } else {
        let card_id = event.target.closest("li").className.split(" ")[1];
        let input = prompt(`Edit "${pointerDownedCardContent.querySelector(".card-contents").innerText}" to...`);
        if (input) {
          let params = {
            card_id,
            new_contents: input,
          };
          Api.Card().updateCard(params);

          // 프론트엔드에서 업데이트된 결과물을 우선 보여줌
          pointerDownedCardContent.querySelector(".card-contents").innerText = input;
        }
        clicks = 0;
        return;
      }
    } else {
      if (pointerDownedCard === null || pointerDownedCard.className === "start") {
        return;
      }
      this.clicked = true;
      this.targetElement = pointerDownedCard;
      this.hoveringElement = pointerDownedCard.cloneNode(true);
      this.targetElement.classList.add("temp");

      shift["x"] =
        event.clientX - this.targetElement.getBoundingClientRect().left;
      shift["y"] =
        event.clientY - this.targetElement.getBoundingClientRect().top;

      const { pageX, pageY } = event;
      hover.appendChild(this.hoveringElement);

      hover.style.left = pageX - shift["x"] + "px";
      hover.style.top = pageY - shift["y"] - 10 + "px";
    }
  }

  async pointerup() {
    if (this.currTarget.className == "card-list-wrapper") {
      return;
    }
    if (!this.targetElement) {
      return;
    }

    this.clicked = false;
    if (this.targetElement) {
      this.targetElement.classList.remove("temp");
    }
    if (this.hoveringElement) {
      this.hoveringElement.remove();
    }
    document.getElementsByClassName("temp").forEach((element) => {
      element.remove();
    });
    let params = {
      card_id: this.targetElement.className.split(" ")[1],
      new_contents: this.targetElement.childNodes[0].childNodes[1].innerText,
      new_column_id: this.targetElement.parentNode.parentNode.id.split("-")[1],
    };
    await Api.Card().updateCard(params);

    this.hoveringElement = undefined;
    this.targetElement = undefined;
  }

  pointerleave() {
    if (!this.clicked) {
      return;
    }

    () => {
      this.pointerup();
    };
  }
}
