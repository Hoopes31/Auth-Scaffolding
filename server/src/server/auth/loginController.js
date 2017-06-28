var _ = require("lodash");
var Users = require("../api/user/userModel");
var logger = require("../util/logger");

//how to create a token from AUTH
var signToken = require("./auth").signToken;

//Verification && Tokenization Middleware here ---->

exports.root = (req, res) => {
  res.send('login Root hit')
};

exports.login = (req, res, next) => {
  var token = `Bearer ${signToken(req.user._id)}`;

  res.header("Authorization", token);
  console.log(token)
  res.send("login POST hit");
};
