class Card {
  constructor(cardData) {
    let id;
    let contents;
    let column_id;
    let user_id;
    let order;
    let created_at;
    let updated_at;

    this.setId(cardData.id);
    this.setContents(cardData.contents);
    this.setColumnId(cardData.column_id);
    this.setOrder(cardData.order);
    this.setUserId(cardData.user_id);
    this.setCreatedAt(cardData.created_at);
    this.setUpdatedAt(cardData.updated_at);
  }

  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }

  setContents(contents) {
    this.contents = contents;
  }
  getContents() {
    return this.contents;
  }
  setOrder(order) {
    this.order = order;
  }
  getOrder() {
    return this.order;
  }
  setUserId(user_id) {
    this.user_id = user_id;
  }
  getUserId() {
    return this.user_id;
  }

  setPassword(password) {
    this.password = password;
  }
  getPassword() {
    return this.password;
  }

  setColumnId(column_id) {
    this.column_id = column_id;
  }
  getColumnId() {
    return this.column_id;
  }

  setCreatedAt(created_at) {
    this.created_at = created_at;
  }
  getCreatedAt() {
    return this.created_at;
  }
  setUpdatedAt(updated_at) {
    this.updated_at = updated_at;
  }
  getUpdatedAt() {
    return this.updated_at;
  }
}

module.exports = { Card };
