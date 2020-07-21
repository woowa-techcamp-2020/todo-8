var express = require("express");
var router = express.Router();

var userRouter = require("./userRouter");
var cardRouter = require("./cardRouter");

router.use("/api", userRouter);
router.use("/api", cardRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
