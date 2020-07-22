async function createUser(user) {
  return await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ userId: user.userId, password: user.password }),
    headers: { "Content-Type": "application/json" },
  }).then(async function (response) {
    let result = await response.json();

    if (result.result === "ok") {
      return result;
    } else if (result.result === "fail") {
      return result;
    }
  });
}

async function getAllUsers() {
  return await fetch("/api/users")
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "ok") {
        return res.userList;
      } else if (res.result === "fail") {
        return res.message;
      }
    })
    .catch((e) => {
      throw e;
    });
}

async function getUserById(id) {
  return await fetch(`/api/users/${id.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async function (response) {
    let result = await response.json();
    if (result.result == "ok") {
      return result.user;
    } else if (result.result == "fail") {
      console.log(result.message);
    }
  });
}

async function updateUser(user) {
  return await fetch("/api/users", {
    method: "PUT",
    body: JSON.stringify({ user }),
    headers: { "Content-Type": "application/json" },
  }).then(async function (response) {
    let result = await response.json();
    if (result.result == "ok") {
      return result.user;
    } else if (result.result == "fail") {
      console.log(result.message);
    }
  });
}

async function deleteUser(id) {
  return await fetch(`/api/users/${id.id}`, {
    method: "DELETE",
  }).then(async function (response) {
    let result = await response.json();
    if (result.result == "ok") {
      console.log(result.message);
    } else if (result.result == "fail") {
      console.log(result.message);
    }
  });
}
export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
