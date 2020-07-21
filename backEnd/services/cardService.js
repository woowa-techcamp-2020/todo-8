var cardModel = require("../models/card.js");
var cardRepo = require("../repositories/cardRepository.js");
const moment = require("moment");

/*
  request -> router -> service -> repo -> db -> CRUD models -> repo -> service -> router -> response
 */

function createCard(cardParams) {
  cardParams.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
  cardParams.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");

  let cardDTO = new cardModel.Card(cardParams);
  let card = cardRepo.createCard(cardDTO);

  return card;
}
function getAllCards() {
  let cardList = cardRepo.getAllCards();
  return cardList;
}

function getCardById(id) {
  let card = cardRepo.getCardById(id);

  return card;
}
module.exports = { createCard, getAllCards, getCardById };
