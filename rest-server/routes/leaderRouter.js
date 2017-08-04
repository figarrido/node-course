const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leadership');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
  .get(function (req, res, next) {
    Leaders.find({}, function (err, leaders) {
      if (err) throw err;
      res.json(leaders);
    });
  })

  .post(function (req, res, next) {
    Leaders.create(req.body, function (err, leader) {
      if (err) throw err;
      const leaderId = leader._id;
      res.writeHead(201, {'Content-Type': 'text/plain'});
      res.end('Leader successfully created with id: ' + leaderId);
    });
  })

  .delete(function (req, res, next) {
    Leaders.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

leaderRouter.route('/:leaderId')
  .get(function (req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
      if (err) throw err;
      res.json(leader);
    });
  })

  .put(function (req, res, next) {
    Leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body}, {
      new: true
    }, function (err, leader) {
      if (err) throw err;
      res.json(leader);
    });
  })

  .delete(function (req, res, next) {
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = leaderRouter;
