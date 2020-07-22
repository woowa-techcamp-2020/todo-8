async function createTodo(todo) {
  return await fetch("/api/todo", {
    method: "POST",
    body: JSON.stringify(todo),
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

async function getAllTodos() {
  return await fetch("/api/todo")
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "ok") {
        return res.todoList;
      } else if (res.result === "fail") {
        return res.message;
      }
    })
    .catch((e) => {
      throw e;
    });
}

async function getTodoById(id) {
  return await fetch(`/api/todo/${id.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async function (response) {
    let result = await response.json();
    if (result.result == "ok") {
      return result.todo;
    } else if (result.result == "fail") {
      console.log(result.message);
    }
  });
}

async function deleteTodo(id) {
  return await fetch(`/api/todo/${id.id}`, {
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
  createTodo,
  getAllTodos,
  getTodoById,
  deleteTodo,
};
