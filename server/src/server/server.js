//Load instance of EXPRESS server in this file.

//Add MIDDLEWARE, ERROR HANDLING & ROUTES then export.

//Instance of Express created:
const path =  require('path');
const express = require("express");
const app = express();
const logger = require("./util/logger");
const config = require("./config/config");
const fs = require("fs");
require("dotenv").config();
const isProd = process.env.production ? true : false
console.log("isProd = " +  isProd)
//Middleware Loaded:
const middleware = require("./middleware/middleware");
middleware(app);
if(isProd){
  const BUILD_DIR = path.resolve(__dirname, "../../../client/build")

  //Serving the files on the BUILD folder
  app.use(express.static(BUILD_DIR));
  //Send index.html when the user access the web
  app.get(/^((?!api).)*$/g, function (req, res) {  
    res.sendFile(path.resolve(BUILD_DIR, "index.html"));
  });
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