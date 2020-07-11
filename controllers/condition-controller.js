const db = require("../models");
const express = require('express');
const router = express.Router();

// Find all Conditions and return them to the user with res.json
router.get("/api/conditions", function (req, res) {
  db.Condition.findAll({
    include: [db.Post]
  }).then(function (dbCondition) {
    res.json(dbCondition);
  });
});

router.get("/api/conditions/:id", function (req, res) {
  // Find one Condition with the id in req.params.id and return them to the user with res.json
  db.Condition.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (dbCondition) {
    res.json(dbCondition);
  });
});

router.post("/api/conditions", function (req, res) {
  // Create an Condition with the data available to us in req.body
  console.log(req.body);
  db.Condition.create(req.body).then(function (dbCondition) {
    res.json(dbCondition);
  });
});

router.delete("/api/conditions/:id", function (req, res) {
  // Delete the Condition with the id available to us in req.params.id
  db.Condition.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbCondition) {
    res.json(dbCondition);
  });
});

module.exports = router;