// Requiring our models
const db = require("../models");
const express = require('express');
const router = express.Router();


// Routes
// =============================================================

// GET route for getting all of the posts
router.get("/api/search/", function (req, res) {
  var query = {};
  if (req.query.condition_id) {
    query.ConditionId = req.query.condition_id;
  }
  db.Post.findAll({
    where: query,
    include: [db.Condition]
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});


module.exports = router;