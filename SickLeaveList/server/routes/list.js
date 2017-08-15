const express = require('express');
const router = express.Router();
const ListElem = require('../../src/models/listElem');
const User = require('../../src/models/user');

//get all list
router.get('/:userId', function (req, res, next) {
  ListElem.find(function (err, list) {
    if(err) return next(err);
    res.json(list);
  })
  console.log("get list");
});

//save list element
router.post('/:userId', function (req, res, next) {
  const elem = {
    dateFrom: new Date(req.body.dateFrom.year, req.body.dateFrom.month, req.body.dateFrom.day),
    dateTo: new Date(req.body.dateTo.year, req.body.dateTo.month, req.body.dateTo.day),
    type: req.body.type
  };
  ListElem.create(elem, function (err, elem) {
    if (err) return next(err);
    console.log(elem);
  //   // saved!
    User.findByIdAndUpdate(req.params.userId, {$push: {list: elem}}, {save: true, upset: true}, function (err, user) {
      if (err) console.log(err);
      console.log('update');
      res.json(elem);

    })
  });
});

//get list element by id
router.get('/:userId/:id', function (req, res, next) {
  ListElem.findById(req.params.id, function (err, listElem) {
    if(err) return next(err);
    res.json(listElem);
  });

  const user = User.findById(req.params.userId);

});

// update list element
router.put('/:userId/:id', function(req, res, next){
  ListElem.findByIdAndUpdate(req.params.id, req.body, function (err, elemList) {
    if(err) return next(err);
    res.json(elemList);
  })
});

//delete list element
router.delete('/:userId/:id', function (req, res, next) {
  ListElem.findByIdAndRemove(req.params.id, req.body, function(err, listElem){
    if(err) return next(err);
    res.json(listElem);
  })
});

module.exports = router;
