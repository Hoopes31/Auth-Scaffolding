var _ = require("lodash");
var signToken = require("../../auth/auth").signToken;

exports.root = (req, res) => {
  res.json({token: 'token stuff'})
}

exports.createUser = (req, res) => {
  //import model
  const User = require("../user/userModel");

  //instance of model
  let newUser = new User();

  //grab data and destructure if needed
  const data = req.body;

  //use lodash to write object properties into newUser
  _.assign(newUser, data);

  //save to mongo db
  newUser.save(function(err, newUser) {
    if (err) {
      return res.json({ err: err.message})
    }
    else {
      const token = `Bearer ${signToken(newUser._id)}`;
      return res.json({ token: token });
    }  
  });
};
