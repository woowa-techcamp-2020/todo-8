function register(user) {
  var userId = user.userId;
  var userPassword = user.password;

  fetch("/api/register", {
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
        console.log("이미존재합니다");
      }
    })
    .catch((e) => {
      throw e;
    });
}

async function getAllUsers() {
  return await fetch("/api/getAllusers")
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

export default { register, getAllUsers };
