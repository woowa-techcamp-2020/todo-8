const display = document.getElementById("display");
const column = window.document.getElementById("app");

const state = {
  count: 0,
};

// Components

const counter = function (count) {
  let classname = "text-error";

  if (count > 10) {
    classname = "text-success";
  }

  return `<p class="Counter">Count: <span class="${classname}">${count}</span></p>`;
};

// Render Methods

function renderCount() {
  display.innerHTML = counter(state.count);
}

// Update methods

function incCountUp() {
  let newCount = state.count + 1;
  state.count = newCount;

  renderCount();
}

renderCount();
