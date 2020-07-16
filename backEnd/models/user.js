class User {
  constructor(userData) {
    let id;
    let userId;
    let password;

    this.setId(userData.id);
    this.setUserId(userData.userId);
    this.setPassword(userData.password);

    this.setId = function(newId) {
      id = newId;
    }

    this.getUserId = function() {
      return userId;
    }

    this.setUserId = function(newUserId) {
      userId = newUserId;
    }

    this.getPassword = function() {
      return password;
    }

    this.setPassword = function(newPassword) {
      name = newPassword;
    }
  }
}

module.exports = { User };
