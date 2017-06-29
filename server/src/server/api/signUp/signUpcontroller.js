var _ = require("lodash");
var signToken = require("../../auth/auth").signToken;

exports.createUser = (req, res) => {
  console.log("You hit the signup Route");
  //import model
  var User = require("../user/userModel");

  //instance of model
  var user = new User();

  //grab data and destructure if needed
  var data = req.body

  //use lodash to write object properties into newUser
  _.assign(user, data);

  //save to mongo db
  
  user.save(function(err, user) {
    if (err) return console.error(err.stack);

    //check to make sure user was created in console
    //delete later

    console.log(JSON.stringify(user));
    var token = signToken(user._id);
    res.json({ token: token });
  });
  
  console.log(`Thanks for creating a profile`);
};

exports.root = (req, res) => {
  res.send('sign up page')
}
