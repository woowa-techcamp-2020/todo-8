class Column {
  constructor(columnData) {
    let id;
    let title;
    let todo_id;
    let created_at;
    let updated_at;

    this.setId(columnData.id);
    this.setTitle(columnData.title);
    this.setTodoId(columnData.todo_id);
    this.setCreatedAt(columnData.created_at);
    this.setUpdatedAt(columnData.updated_at);
  }

  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }

  setTitle(title) {
    this.title = title;
  }
  getTitle() {
    return this.title;
  }
  setTodoId(todo_id) {
    this.todo_id = todo_id;
  }
  getTodoId() {
    return this.todo_id;
  }

  setPassword(password) {
    this.password = password;
  }
  getPassword() {
    return this.password;
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

module.exports = { Column };
