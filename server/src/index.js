//Root index.js is a start file

var config = require("./server/config/config");
var app = require("./server/server.js");
var mongoose = require("mongoose");
require("dotenv").config();

//Database Start
mongoose.connect(`mongodb://localhost/${config.db.url}`, err => {
  if (!err) {
    console.log(`Connected to ${config.db.url}`);
  } else {
    console.log(`ERROR ${err}`);
  }
});

//Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

module.exports = app;
