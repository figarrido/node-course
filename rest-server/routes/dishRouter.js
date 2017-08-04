const express = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
  .get(function (req, res, next) {
    Dishes.find({}, function (err, dishes) {
      if (err) throw err;
      res.json(dishes);
    });
  })

  .post(function (req, res, next) {
    Dishes.create(req.body, function (err, dish) {
      if (err) throw err;

      const dishId = dish._id;
      res.writeHead(201, {'Content-Type': 'text/plain'});
      res.end('Dish created with ID: ' + dishId);
    });
  })

  .delete(function (req, res, next) {
    Dishes.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

dishRouter.route('/:dishId')
  .get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (err) throw err;
      res.json(dish);
    });
  })

  .put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {
      new: true
    }, function (err, dish) {
      if (err) throw err;
      res.json(dish);
    });
  })

  .delete(function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

dishRouter.route('/:dishId/comments')
  .get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (err) throw err;
      res.json(dish.comments);
    });
  })

  .post(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (err) throw err;
      dish.comments.push(req.body);
      dish.save(function (err, dish) {
        if (err) throw err;
        console.log('Updated Comments!');
        res.json(dish);
      });
    });
  })

  .delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (err) throw err;
      for (var i = (dish.comments.length - 1); i >= 0; i--) {
        dish.comments.id(dish.comments[i]._id).remove();
      }
      dish.save(function (err, result) {
        if (err) throw err;
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('Deleted all comments!');
      });
    });
  });

dishRouter.route('/:dishId/comments/:commentId')
  .get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (err) throw err;
      res.json(dish.comments.id(req.params.commentId));
    });
  })

  .put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (err) throw err;
      dish.comments.id(req.params.commentId).remove();
      dish.comments.push(req.body);
      dish.save(function (err, dish) {
        if (err) throw err;
        console.log('Updated Comments!');
        res.json(dish);
      });
    });
  })

  .delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
      if (err) throw err;
      dish.comments.id(req.params.commentId).remove();
      dish.save(function (err, resp) {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = dishRouter;
