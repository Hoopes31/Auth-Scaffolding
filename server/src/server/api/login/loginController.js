const Users = require("../user/userModel");

//how to create a token from AUTH
const signToken = require("../../auth/auth").signToken;

//Verification && Tokenization Middleware here ---->

exports.login = (req, res, next) => {
  const token = `Bearer ${signToken(req.user._id)}`;
  const role = req.user.role;
  return res.json({
    token: token,
    role: role
  });
};
