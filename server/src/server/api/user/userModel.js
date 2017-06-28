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
  gardin: {
    type: Schema.Types.ObjectId,
    ref: "gardin"
  }
});

//Add methods to your schema

UserSchema.pre("save", function(next) {
  //before saving a password we need to hash + salt
  //for security

  if (!this.isModified("password")) return next();

  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  //check password on sign in
  authenticate: function(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  //hash the passwords
  encryptPassword: function(plainTextPassword) {
    if (!plainTextPassword) {
      return "";
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPassword, salt);
    }
  }
};
module.exports = mongoose.model("user", UserSchema);
