(function () {
  const currentDocument = document.currentScript.ownerDocument;

  console.log("실행되나보자", currentDocument);
  // Private Methods will go here:
  // ...

  class PeopleList extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    connectedCallback() {
      // Create a Shadow DOM using our template
      const shadowRoot = this.attachShadow({ mode: "open" });
      const template = currentDocument.querySelector("#people-list-template");
      const instance = template.content.cloneNode(true);
      shadowRoot.appendChild(instance);
    }

    get list() {
      return this._list;
    }

    set list(list) {
      this._list = list;
      this.render();
    }

    render() {
      let ulElement = this.shadowRoot.querySelector(".people-list__list");
      ulElement.innerHTML = "";

      this.list.forEach((person) => {
        let li = _createPersonListElement(this, person);
        ulElement.appendChild(li);
      });
    }
  }

  customElements.define("people-list", PeopleList);
})();

function _createPersonListElement(self, person) {
  let li = currentDocument.createElement("LI");
  li.innerHTML = person.name;
  li.className = "people-list__name";
  li.onclick = () => {
    let event = new CustomEvent("PersonClicked", {
      detail: {
        personId: person.id,
      },
      bubbles: true,
    });
    self.dispatchEvent(event);
  };
  return li;
}
