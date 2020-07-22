var express = require("express");
var router = express.Router();
var columnService = require("../services/columnService.js");

/* GET columns listing. */
router.post("/column", async function (req, res, next) {
  var columnData = req.body;
  var result = await columnService.createColumn(columnData);
  res.json(result);
});

router.get("/column", async function (req, res, next) {
  var result = await columnService.getAllColumns();
  res.json(result);
});

router.get("/column/:id", async function (req, res, next) {
  var result = await columnService.getColumnById(req.params.id);

  res.json(result);
});

router.delete("/column/:id", async function (req, res, next) {
  var result = await columnService.deleteColumn(req.params.id);
  res.json(result);
});

router.put("/column", async function (req, res, next) {
  let newColumn = req.body.column;
  var result = await columnService.updateColumn(newColumn);
  res.json(result);
});

module.exports = router;
