class Card {
  constructor(cardData) {
    let id;
    let name;
    let column_id;
    let user_id;
    let created_at;
    let updated_at;

    this.setId(cardData.id);
    this.setName(cardData.name);
    this.setColumnId(cardData.column_id);
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

  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
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
