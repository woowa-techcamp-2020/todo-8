class Todo {
  constructor(todoData) {
    let id;
    let user_id;
    let created_at;
    let updated_at;

    this.setId(todoData.id);
    this.setUserId(todoData.user_id);
    this.setCreatedAt(todoData.created_at);
    this.setUpdatedAt(todoData.updated_at);
  }

  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }

  setUserId(user_id) {
    this.user_id = user_id;
  }
  getUserId() {
    return this.user_id;
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

module.exports = { Todo };
