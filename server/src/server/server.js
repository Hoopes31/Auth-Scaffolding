//Load instance of EXPRESS server in this file.

//Add MIDDLEWARE, ERROR HANDLING & ROUTES then export.

//Instance of Express created:
const express = require("express");
const app = express();
const logger = require("./util/logger");
const config = require("./config/config");

//Middleware Loaded:
const middleware = require("./middleware/middleware");
middleware(app);

//Setup Route
const api = require("./api/router");
app.use("/api", api);

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
