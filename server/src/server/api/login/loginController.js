const Users = require("../user/userModel");
const logger = require("../../util/logger");

//how to create a token from AUTH
const signToken = require("../../auth/auth").signToken;

//Verification && Tokenization Middleware here ---->

exports.root = (req, res) => {
  res.sendFile("/", { root: "./src/client/login/" });
};

exports.login = (req, res, next) => {
  const token = `Bearer ${signToken(req.user._id)}`;
  return res.json({token: token})
};
