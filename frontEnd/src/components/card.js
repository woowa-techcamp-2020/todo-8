class Card {
  constructor(CardDTO) {
    this.id = CardDTO.id;
    this.name = CardDTO.name;
    this.created_at = CardDTO.created_at;
    this.updated_at = CardDTO.updated_at;
    this.column_id = CardDTO.column_id;
    this.user_id = CardDTO.user_id;
  }

  render() {
    const item = document.createElement("div");
    item.classList.add("card");
    item.innerHTML = `
      <div class="item__show">
        <div class="item__col">logo</div>
        <div class="item__col">
          <span class="item__content">${this.name}</span>
          <span class="item__creator">Added by ${this.user_id}</span>
        </div>
        <div class="item__col"><button class="item__close-btn">X</button></div>
      </div>
      <div class="item__update hide">
        <textarea></textarea>
        <div class="item__update-btns">
          <button class="update-btn">Update</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
      `;
  }
}
