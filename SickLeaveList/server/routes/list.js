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
  // ListElem.create(req.body, function (err, post) {
  //   if(err) return next(err);
  //   res.json(post);
  // })
  console.log(req.body);
});

//get list element by id
router.get('/:userId/:id', function (req, res, next) {
  ListElem.findById(req.params.id, function (err, listElem) {
    if(err) return next(err);
    res.json(listElem);
  })

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
