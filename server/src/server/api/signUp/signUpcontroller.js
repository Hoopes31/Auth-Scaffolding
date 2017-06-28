var _ = require("lodash");
var signToken = require("../../auth/auth").signToken;

exports.createUser = (req, res) => {
  console.log("You hit the signup Route");
  //import model
  var User = require("../user/userModel");

  //instance of model
  var newUser = new User();

  //grab data and destructure if needed
  var data = req.body;

  //use lodash to write object properties into newUser
  _.assign(newUser, data);

  //save to mongo db
  newUser.save(function(err, newUser) {
    if (err) return console.error(err);

    //check to make sure user was created in console
    //delete later

    console.log(JSON.stringify(newUser));
    var token = signToken(user._id);
    res.json({ token: token });
  });

  res.send(`Thanks for creating a profile`);
};

exports.root = (req, res) => {
  res.send('sign up page')
}
