var express = require("express");
var router = express.Router();
var cardService = require("../services/cardService.js");

/* GET cards listing. */
router.post("/card", async function (req, res, next) {
  var cardData = req.body;
  console.log("cardRouter", cardData);
  var card = await cardService.createCard(cardData);
  console.log("cardRouter", card);
  if (card === "ER_DUP_ENTRY") {
    res.json({ result: "duplicate", message: "이미 존재하는 아이디입니다" });
  } else {
    res.json({ result: "ok", message: "회원가입 성공" });
  }
});

router.get("/card", async function (req, res, next) {
  var cardList = await cardService.getAllcards();
  res.json({ result: "ok", cardList: cardList });
});

router.get("/card/:id", async function (req, res, next) {
  var card = await cardService.getCardById(req.params.id);
  res.json({ result: "ok", card: card });
});

module.exports = router;
