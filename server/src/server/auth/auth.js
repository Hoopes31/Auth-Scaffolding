//Do all authentication work here
//Assignment, Middleware, Checking All here

"use strict";
require("colors");
const jwt = require("jsonwebtoken");

//expressJWT is an express wrapper for jwt for ease of use
const expressJwt = require("express-jwt");
const config = require("../config/config");

//use of expressJwt!
//grab user Model and create an instance of it
const User = require("../api/user/userModel");
const checkToken = expressJwt({ secret: config.secrets.jwt })

exports.decodeToken = (req, res, next) => {
  req.token = req.get('Authorization')
  checkToken(req, res, next)
}

exports.getUser = (req, res, next) => {
    User.findById(req.user._id).then(
      function(user) {
        if (!user) {
          res.status(401).send("Unauthorized");
        } else {
          req.user = user;
          next();
        }
      },
      function(err) {
        next(err);
      }
    );
};

exports.verifyUser = (req, res) => {
  return (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    //verify username and password were passed in

    if (!username || !password) {
      res.status(401).send("You need an account");
      //return causes us to exit loop so you don't blow your shit up.
      return;
    }

    //check to see if user exisits in our db
    //if it does check that the passwords match

    User.findOne({ username: username }).then(user => {
      if (!user) {
        res.status(401).send('No user by that Username');
      } else {
        // Check to see if pass matches with the authenticate method we created on the User Model. --> api/user/userModel
        if (!user.authenticate(password)) {
          res.status(401).send("That is the wrong password");
        } else {
          //if all good attach req.user to user for further work on user.
          req.user = user;
          next();
        }
      }
    }), function(err) {
      next(err);
    };
  };
};

exports.signToken = id => {
  //send back a signed ID + Secret with Expiration Count
  return jwt.sign({ _id: id }, config.secrets.jwt, {
    expiresIn: config.expireTime
  });
};
