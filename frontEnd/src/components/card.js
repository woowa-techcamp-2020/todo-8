(function () {
  const currentDocument = document.currentScript.ownerDocument;
  console.log(currentDocument);
  class Card extends HTMLElement {
    constructor() {
      super();
      // Setup a click listener on <user-card>
      this.addEventListener("click", (e) => {
        this.toggleCard();
      });
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "open" });
      const template = currentDocument.querySelector("#card-detail-template");
      console.log("이게뭘까?", template);
      // const instance = template.content.cloneNode(true);
      //shadowRoot.appendChild(instance);
    }

    // Creating an API function so that other components can use this to populate this component
    updateCardDetail(cardData) {
      this.render(cardData);
    }

    // Function to populate the card(Can be made private)
    render(cardData) {
      this.shadowRoot.querySelector(".card-name").innerHTML = cardData.name;
      this.shadowRoot.querySelector(".card-writer").innerHTML =
        cardData.user_id;
    }

    toggleCard() {
      console.log("날 눌렀구나!");
      // let elem = this.shadowRoot.querySelector(".card__hidden-content");
      // let btn = this.shadowRoot.querySelector(".card__details-btn");
      // btn.innerHTML =
      //   elem.style.display == "none" ? "Less Details" : "More Details";
      // elem.style.display = elem.style.display == "none" ? "block" : "none";
    }
  }

  customElements.define("card-detail", Card);
})();
