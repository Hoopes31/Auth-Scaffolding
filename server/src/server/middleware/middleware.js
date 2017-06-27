//Set up middleware function to call inside our server

//create and store modules
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");

function middleware(app) {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
}

module.exports = middleware;
