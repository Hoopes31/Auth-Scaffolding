var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  date: { 
    type: Date, 
    default: Date.now()
  }
});

//Add methods to your schema

UserSchema.pre("save", function(next) {
  //before saving a password we need to hash + salt
  if (!this.isModified("password")) return next();

  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  //check password on sign in
  authenticate: function(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },

  //Hash the passwords
  encryptPassword: function(plainTextPassword) {
    if (!plainTextPassword) {
      return "";
    } else {

      //Salt the Password
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPassword, salt);
    }
  }
};

UserSchema.pre("save", function(next, done) {
  const User = mongoose.model("User", UserSchema);
  User.findOne({ username: this.username }, function(err, result) {
    if (err) {
      done(err);
    } else if (result) {
      done(new Error("Username is already in use"));
    } else {
      next();
    }
  });
});
module.exports = mongoose.model("users", UserSchema);
