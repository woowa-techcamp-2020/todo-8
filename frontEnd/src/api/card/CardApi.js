async function createCard(card) {
  return await fetch("/api/card", {
    method: "POST",
    body: JSON.stringify(card),
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

async function getAllCards() {
  return await fetch("/api/card")
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

async function getCardById(id) {
  return await fetch(`/api/card/${id.id}`, {
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

async function getCardByColumnId(id) {
  return await fetch(`/api/card/column/${id}`, {
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

async function updateCard(params) {
  return await fetch("/api/card", {
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

async function deleteCard(id) {
  return await fetch(`/api/card/${id.id}`, {
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
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
  getCardByColumnId,
};
