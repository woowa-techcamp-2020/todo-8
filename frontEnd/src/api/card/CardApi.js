async function createCard(card) {
  return await fetch("/api/card", {
    method: "POST",
    body: JSON.stringify({
      name: card.name,
      column_id: card.column_id,
      user_id: card.user_id,
    }),
    headers: { "Content-Type": "application/json" },
  }).then(function (response) {
    let card = response.json();

    return card;
  });
}

async function getAllCard() {
  return await fetch("/api/card", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(function (response) {
    let cardList = response.json();

    return cardList;
  });
}

async function getCardByName(name) {
  return await fetch("/api/card/" + name, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(function (response) {
    let card = response.json();

    return card;
  });
}

export default { createCard, getAllCard, getCardByName };
