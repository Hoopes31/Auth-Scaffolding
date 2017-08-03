//Root index.js is a start file

var config = require("./server/config/config");
var app = require("./server/server.js");
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
require("dotenv").config();

//Database Start
mongoose.connect(process.env.MONGO_URI, err => {
  if (!err) {
    console.log(`Connected to ${process.env.MONGO_URI}`);
  } else {
    console.log(`ERROR ${err}`);
  }
});

//Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

module.exports = app;
