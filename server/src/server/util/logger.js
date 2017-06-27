//This is an optional logger to help you see whats happening in your console.
//Built for visual appeal by the course supervisor

//color module: attaches colors to String.prototype
require("colors");
var emoji = require("node-emoji");
var _ = require("lodash");

var config = require("../config/config");

//No Op is setup to sendback a no operation if logging is set to false in our env config

var noop = function() {};

var consoleLog = config.logging ? console.log.bind(console) : noop;

var logger = {
  log: function(args) {
    var logAlert = `[  ${emoji.get("sparkles")}  LOG ${emoji.get(
      "sparkles"
    )}   ] `.yellow;

    var args = _.toArray(arguments).map(function(arg) {
      if (typeof arg === "Object") {
        var string = JSON.stringify(arg, null, 2);
        return logAlert + string.red;
      } else {
        arg.toString();
        return logAlert + arg.red;
      }
    });

    consoleLog.apply(console, args);
  }
};
module.exports = logger;
