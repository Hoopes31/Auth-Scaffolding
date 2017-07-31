//Load instance of EXPRESS server in this file.

//Add MIDDLEWARE, ERROR HANDLING & ROUTES then export.

//Instance of Express created:
const path =  require('path');
const express = require("express");
const app = express();
const logger = require("./util/logger");
const config = require("./config/config");
const isProd = app.get('env') === 'production' ? true : false

console.log("isProd =" +  isProd)
//Middleware Loaded:
const middleware = require("./middleware/middleware");
middleware(app);
if(isProd){
  app.set('views', path.join(__dirname, '../../../client/build'));
  app.set('view engine', 'html');
  app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
  app.use('/client', express.static('client'));
}


//Setup Route
const api = require("./api/router");
app.use("/api", api);

//Setup Seed
if(config.seed) {
  require('./util/seed')
}

//Setup Error Handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid Token");
    return;
  }
  logger.log(err.stack);
  res.status(500).send("Some Error Hit");
});

//Export app now that all components have been added

module.exports = app;