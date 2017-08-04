const express = require('express');
const bodyParser = require('body-parser');
const Promos = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
  .get(function (req, res, next) {
    Promos.find({}, function (err, promos) {
      if (err) throw err;
      res.json(promos);
    });
  })

  .post(function (req, res, next) {
    Promos.create(req.body, function (err, promo) {
      if (err) throw err;
      const promoId = promo._id;
      res.writeHead(201, {'Content-Type': 'text/plain'});
      res.end('Leader successfully created with id: ' + promoId);
    });
  })

  .delete(function (req, res, next) {
    Promos.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

promoRouter.route('/:promoId')
  .get(function (req, res, next) {
    Promos.findById(req.params.promoId, function (err, promo) {
      if (err) throw err;
      res.json(promo);
    });
  })

  .put(function (req, res, next) {
    Promos.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {
      new: true
    }, function (err, promo) {
      if (err) throw err;
      res.json(promo);
    });
  })

  .delete(function (req, res, next) {
    Promos.findByIdAndRemove(req.params.promoId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = promoRouter;
