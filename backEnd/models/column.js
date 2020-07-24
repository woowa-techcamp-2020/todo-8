class Column {
  constructor(columnData) {
    let id;
    let title;
    let todoList_id;
    let created_at;
    let updated_at;

    this.setId(columnData.id);
    this.setTitle(columnData.title);
    this.setTodoId(columnData.todoList_id);
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
  setTodoId(todoList_id) {
    this.todoList_id = todoList_id;
  }
  getTodoId() {
    return this.todoList_id;
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
