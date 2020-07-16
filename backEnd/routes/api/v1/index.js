var express = require('express');
var router = express.Router();


/*
  HOW TO USE API Routing

  1. create data model in backEnd / models / model.js
  2. create folder backEnd / routes / api / v1 / model / index.js or backEnd / routes / api / v1 / models.js
  3. declare router to underline
      var modelRouter = require('./models');
      router.use('/models', modelRouter);
 */

var userRouter = require('./users')
router.use('/users', userRouter);

module.exports = router;
