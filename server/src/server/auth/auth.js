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
const checkToken = expressJwt({ secret: config.secrets.jwt });

exports.decodeToken = (req, res, next) => {
  req.token = req.get("Authorization");
  checkToken(req, res, next);
};

exports.getUser = (req, res, next) => {
  User.findById(req.user._id).then(
    function(user) {
      if (!user) {
        res.status(500).send("Unauthorized");
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
      res.end();
    }

    //check to see if user exisits in our db
    //if it does check that the passwords match

    User.findOne({ username: username }).then(user => {
      if (!user) {
        res.status(401).send("No user by that Username");
        
        // Check to see if pass matches with the authenticate method we created on the User Model. --> api/user/userModel
      } else {
        if (!user.authenticate(password)) {
          res.status(401).send("That is the wrong password");
        
        //if all good attach req.user to user for further work on user.
        } else {
          req.user = user;
          return next();
        }
      }
    }), function(err) {
      next(err);
    };
  };
};

exports.roleAuthorization = function(roles){
    return function(req, res, next){
        let user = req.user;
        User.findById(user._id, function(err, foundUser){
            if(err){
                return res.status(422).json({error: 'No user found.'});
            }
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
        });
    }
}

exports.signToken = id => {
  //send back a signed ID + Secret with Expiration Count
  return jwt.sign({ _id: id }, config.secrets.jwt, {
    expiresIn: config.expireTime
  });
};
