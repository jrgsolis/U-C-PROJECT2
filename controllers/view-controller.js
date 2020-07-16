const path = require("path");
const router = require('express').Router();
const db = require("../models");


router.get('/listings', renderListings);
router.get('/search', renderSearch);


router.get("/", function (req, res) {
  console.log("Rendering Landing Page: ");
  res.render('landingPage');
});

router.get("/gameinfo", function (req, res) {
  console.log("Rendering Game Info: "+ req.query);
  res.render('gameinfo');
});

router.get("/post", function (req, res) {
  res.render('post');
});

router.get("/conditions", function (req, res) {
  res.render('conditions');
});


// helper for / and dashboard routes
function renderSearch(req, res) {
  var query = {};
  if (req.query.condition_id) {
    query.ConditionId = req.query.condition_id;
  }
  db.Post.findAll({
    where: query,
    include: [db.Condition]
  }).then(function (posts) {
    res.render('search', { posts: posts })
  });
}


// helper for / and listing routes
function renderListings(req, res) {
  var query = {};
  if (req.query.condition_id) {
    query.ConditionId = req.query.condition_id;
  }
  db.Post.findAll({
    where: query,
    include: [db.Condition]
  }).then(function (posts) {
    res.render('listings', { posts: posts })
  });
}

module.exports = router;