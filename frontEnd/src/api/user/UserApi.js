async function createUser(user) {
  return await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ userId: 123, password: "password" }),
    headers: { "Content-Type": "application/json" },
  }).then(function (response) {
    let user = response.json();

    return user;
  });
}

function register(user) {
  var userId = user.userId;
  var userPassword = user.password;

  fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      password: userPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "ok") {
        console.log("ok");
      } else if (res.result === "duplicate") {
        console.log(res.message);
      }
    })
    .catch((e) => {
      throw e;
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

export default { createUser, register, getAllUsers };
