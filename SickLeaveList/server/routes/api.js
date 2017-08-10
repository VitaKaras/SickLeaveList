const express = require('express');
const router = express.Router();
var User = require('../../src/models/user');
var bcrypt = require('bcrypt');

router.post('/', function(req, res, next) {
  console.log("boduy" + req.body);
  if (req.body.firstName &&
    req.body.lastName &&
    req.body.email &&
    req.body.telephone &&
    req.body.login &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      telephone: req.body.telephone,
      login: req.body.login,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        res.json(user);
      }
    });

  } else if (req.body.login && req.body.password) {
    console.log("reques" + req.body.login);
    User.findOne({ login: req.body.login }, function (err, user) {
      if(err) return next(err);
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if(result === true) {
          req.session.userId = user._id;
          res.json(user);
        } else {
          res.json(null);
        }
      })

    })

    // User.authenticate(req.body.login, req.body.password, function (error, user) {
    //   console.log(req.body.login);
    //   console.log(req.body.password);
    //   if (error) {
    //     var err = new Error('Wrong email or password.');
    //     err.status = 401;
    //     return next(err);
    //   } else if(user == "fail") {
    //     console.log("password not correct");
    //   } else {
    //     req.session.userId = user._id;
    //     res.json(user);
    //   }
    // });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});



router.get('/email/:field', function (req, res, next) {
  User.findOne({email: req.params.field}, function (err, users) {
    if(err) return next(err);
    console.log(req.params.field);
    console.log(users);
    res.json(users);
  })
})

router.get('/username/:field', function (req, res, next) {
  User.findOne({login: req.params.field}, function (err, users) {
    if(err) return next(err);
    console.log(req.params.field);
    console.log(users);
    res.json(users);
  })
})

router.get('/logout', function (req, res, next) {
  if (req.session) {
    console.log('session'+ req.session);
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        console.log("session error");
        return next(err);
      } else {
        console.log("redirect after destroy session");
        return res.json("success");
      }
    });
  }
});

module.exports = router;
