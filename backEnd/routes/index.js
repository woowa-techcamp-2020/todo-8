var express = require("express");
var router = express.Router();

var userRouter = require("./userRouter");
var cardRouter = require("./cardRouter");
var columnRouter = require("./columnRouter");

router.use("/api", userRouter);
router.use("/api", cardRouter);
router.use("/api", columnRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
