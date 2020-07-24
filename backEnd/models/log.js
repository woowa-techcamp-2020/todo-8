class Log {
  constructor(logData) {
    let id;
    let contents;
    let todoList_id;
    let user_id;
    let created_at;
    let updated_at;

    this.setId(logData.id);
    this.setContents(logData.contents);
    this.setTodolistId(logData.todoList_id);
    this.setUserId(logData.user_id);
    this.setCreatedAt(logData.created_at);
    this.setUpdatedAt(logData.updated_at);
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

  setTodolistId(todoList_id) {
    this.todoList_id = todoList_id;
  }
  getTodolistId() {
    return this.todoList_id;
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

module.exports = { Log };
