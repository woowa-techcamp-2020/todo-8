var express = require("express");
var router = express.Router();
var cardService = require("../services/cardService.js");

/* GET cards listing. */
router.post("/card", async function (req, res, next) {
  var cardData = req.body;
  var result = await cardService.createCard(cardData);
  res.json(result);
});

router.get("/card", async function (req, res, next) {
  var result = await cardService.getAllCards();
  res.json(result);
});

router.get("/card/:id", async function (req, res, next) {
  var result = await cardService.getCardById(req.params.id);

  res.json(result);
});

router.get("/card/column/:id", async function (req, res, next) {
  var result = await cardService.getCardByColumnId(req.params.id);

  res.json(result);
});

router.delete("/card/:id", async function (req, res, next) {
  var result = await cardService.deleteCard(req.params.id);
  res.json(result);
});

router.put("/card", async function (req, res, next) {
  let params = req.body.params;
  var result = await cardService.updateCard(params);
  res.json(result);
});

module.exports = router;
