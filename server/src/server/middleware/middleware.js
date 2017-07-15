//Set up middleware function to call inside our server

//create and store modules
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmetCustom = require("./helmetCustom");

function middleware(app) {
  helmetCustom(app)
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}

module.exports = middleware;
