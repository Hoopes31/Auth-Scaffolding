//Do all authentication work here
//Assignment, Middleware, Checking All here

/*

Goal: Set up JWT so it gives the user an access token that will be sent with all logged in requests. 

1. This is normally saved in the users authorization header

2. This must be readable by your system

3. Your system must accept the token first, then pass data

4. The token must close after LOGOUT or TIMEOUT

*/
"use strict";
require("colors");
var jwt = require("jsonwebtoken");

//expressJWT is an express wrapper for jwt for ease of use
var expressJwt = require("express-jwt");
var config = require("../config/config");

//use of expressJwt!
var checkToken = expressJwt({ secret: config.secrets.jwt });
//grab user Model and create an instance of it
var User = require("../api/user/userModel");

exports.decodeToken = () => {
  return (req, res, next) => {
    if (req.query && req.query.hasOwnProperty("access_token")) {
      req.headers.authorization = "Bearer " + req.query.access_token;
    }
    //Check header if there is a token verify it if not pass an error
    checkToken(req, res, next);
  };
};

exports.getUser = () => {
  return (req, res, next) => {
    //Grab entire user object!
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
};

exports.verifyUser = (req, res) => {
  return (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    //verify username and password were passed in

    if (!username || !password) {
      res.status(400).send("You need an account");
      //return causes us to exit loop so you don't blow your shit up.
      return;
    }

    //check to see if user exisits in our db
    //if it does check that the passwords match

    User.findOne({ username: username }).then(user => {
      if (!user) {
        res.status(401).send("No user by that username");
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

/*
var user = { _id: "5941a507e2ce213728813188" };
var token = jwt.sign(user, "secret");
var user = jwt.verify(token, "secret");

//Test of Sign and Verify!
console.log(`This is the token:
${token.blue}
This is the user:
${JSON.stringify(user).yellow}`);

//Cool!

*/
