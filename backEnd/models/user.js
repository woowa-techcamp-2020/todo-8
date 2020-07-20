class User {
  constructor(userData) {
    let id;
    let userId;
    let password;
    let created_at;
    let updated_at;

    this.setId(userData.id);
    this.setUserId(userData.userId);
    this.setPassword(userData.password);
    this.setCreatedAt(userData.created_at);
    this.setUpdatedAt(userData.updated_at);
  }

  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }

  setUserId(userId) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
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

module.exports = { User };
