const path = require("path");
const router = require('express').Router();
const db = require("../models");

// Each of the below routes just handles the HTML page that the user gets sent to.


router.get('/', renderDashBoard);
router.get('/dashboard', renderDashBoard);
router.get('/listings', renderListings);
router.get('/search', renderSearch);


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

// helper for / and dashboard routes
function renderDashBoard(req, res) {
  var query = {};
  if (req.query.condition_id) {
    query.ConditionId = req.query.condition_id;
  }
  db.Post.findAll({
    where: query,
    include: [db.Condition]
  }).then(function (posts) {
    res.render('dashboard', { posts: posts })
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