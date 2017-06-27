//Set up basic config requirements for each environment option. Here we are using a CONFIG object that alters its properties depending on how the NODE_ENV is setup.

//lodash requried for merge()at export below
var _ = require("lodash");

//setup your config object, we will later attach meaning to each of the config keys. (...show how and where this is used when you find out)

var config = {
  dev: "development",
  test: "testing",
  prod: "production",
  port: process.env.PORT || 3000
};

//checker to see if NODE_ENV was set, if not set to 'dev'

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

//add a .env property to config that matches current NODE_ENV

config.env = process.env.NODE_ENV;

//Make envConfig an object that is chosen based on selected NODE_ENV

//Good idea to add Error Catching here. Maybe Try/Catch

//This grabs the file for our config
var envConfig = require(`./${config.env}`);

//Merge adds all objects to the left of first Param Object on req call. lodash.merge is called when this is imported/required. So var config = require(thisFile) runs _.merge. and reads process.env.NODE_ENV to trigger all the above

//Merge gives us our proper config object
module.exports = _.merge(config, envConfig);
