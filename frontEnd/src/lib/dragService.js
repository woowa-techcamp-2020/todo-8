let hover = document.querySelector(".hover");
let shift = { x: 0, y: 0 };

function isBefore(element1, element2) {
  if (element2.parentNode === element1.parentNode) {
    for (let prevEl = element1.previousSibling; prevEl; prevEl = prevEl.previousSibling) {
      if (prevEl === element2) {
        return true;
      }
    }
  }
  return false;
}

export default class dragService {
  constructor() {
    this.clicked = false;
    this.hoveringElement = undefined;
    this.targetElement = undefined;
  }

  mousemove(event) {
    // 클릭되지 않았고, 호버링 중인 element가 없다면 아무 것도 하지 않는다.
    if (!this.clicked || !this.hoveringElement) return;

    // MouseEvent 안의 pageX, pageY를 가져온다.
    const { pageX, pageY } = event;

    // 잠시 현재 hover element를 가리고 현재 좌표의 element를 가져온다
    hover.hidden = true;
    const elemBelow = document.elementFromPoint(pageX, pageY);
    const li = elemBelow.closest("li"); // 가장 가까운 리스트
    const ul = elemBelow.closest("ul"); // 가장 가까운 카드
    hover.hidden = false;

    // 마우스가 움직일 때마다 호버가 마우스를 따라다니도록 만드는 것.
    hover.style.left = pageX - shift["x"] + "px";
    hover.style.top = pageY - shift["y"] + "px";

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
          // 현재 끌고 있는 엘리먼츠를 start 카드 바로 다음에 넣는다.
          start.parentNode.insertBefore(this.targetElement, start.nextSibling);
          // 만약 지금 마우스의 위치가 start 아래에 있다면
        } else {
          // 리스트 마지막에 넣는다.
          ul.appendChild(this.targetElement);
        }
      }
    }
    // 그게 아니라 어떤 카드 위에 있다면, 그리고 그 카드 이름이 start가 아니고 지금 엘리먼츠가 li 전에 있다면
    else if (li.className !== "start" && isBefore(this.targetElement, li)) {
      // li 전에 targetElement를 넣는다.
      li.parentNode.insertBefore(this.targetElement, li);
      // start 카드 위에 있다면
    } else if (li.parentNode) {
      // start 카드 다음에 넣는다.
      li.parentNode.insertBefore(this.targetElement, li.nextSibling);
    }
  }

  mousedown(event) {
    this.clicked = true;

    let targetRemove = event.target.closest("li");
    if (targetRemove === null || targetRemove.className === "start") {
      return;
    }

    this.targetElement = targetRemove;
    this.hoveringElement = targetRemove.cloneNode(true);
    this.targetElement.classList.add("temp");

    shift["x"] = event.clientX - this.targetElement.getBoundingClientRect().left;
    shift["y"] = event.clientY - this.targetElement.getBoundingClientRect().top;

    const { pageX, pageY } = event;
    hover.appendChild(this.hoveringElement);

    hover.style.left = pageX - shift["x"] + "px";
    hover.style.top = pageY - shift["y"] + "px";
  }

  mouseup() {
    this.clicked = false;
    if (this.targetElement) {
      this.targetElement.classList.remove("temp");
    }
    if (this.hoveringElement) {
      this.hoveringElement.remove();
    }
    document.getElementsByClassName("temp").forEach(element => {
      element.remove();
    });
    this.hoveringElement = undefined;
    this.targetElement = undefined;
  }

  mouseleave() {
    if (!this.clicked) {
      return;
    }

    () => {
      this.mouseup();
    }
  }
}