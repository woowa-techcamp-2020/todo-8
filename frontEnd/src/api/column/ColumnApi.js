async function createColumn(column) {
  return await fetch("/api/column", {
    method: "POST",
    body: JSON.stringify(column),
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

async function getAllColumns() {
  return await fetch("/api/column")
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "ok") {
        return res.data;
      } else if (res.result === "fail") {
        return res.message;
      }
    })
    .catch((e) => {
      throw e;
    });
}

async function getColumnById(id) {
  return await fetch(`/api/column/${id.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async function (response) {
    let result = await response.json();
    if (result.result == "ok") {
      return result.data;
    } else if (result.result == "fail") {
      console.log(result.message);
    }
  });
}

async function updateColumn(params) {
  return await fetch("/api/column", {
    method: "PUT",
    body: JSON.stringify({ params }),
    headers: { "Content-Type": "application/json" },
  }).then(async function (response) {
    let result = await response.json();
    if (result.result == "ok") {
      return result.data;
    } else if (result.result == "fail") {
      console.log(result.message);
    }
  });
}

async function deleteColumn(id) {
  return await fetch(`/api/column/${id.id}`, {
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
  createColumn,
  getAllColumns,
  getColumnById,
  updateColumn,
  deleteColumn,
};
