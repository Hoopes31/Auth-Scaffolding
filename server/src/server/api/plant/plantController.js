//import schema

//Global Route Middleware --------->

var _ = require("lodash");
var logger = require("../../util/logger");

//Custom Routes Middleware -------->

//Define Variables ---------------->

var plants = [];
var id = 0;
var plant;

exports.root = (req, res, next) => {
//Grab User INFO    
//Send Logged in GUI
  //Profile Options
    //Show Gardin
        //Edit Plants
        //Water Plants
        //Delete Plants
        //Feed Plants
  logger.log(`Plant Route`);
  res.sendFile("/", { root: "./src/client/" });
};

exports.findPlantById = (req, res, next, id) => {
  plant = _.find(plants, { id: id });
  if (!plant) {
    console.log(`No param matches`);
    res.redirect("/");
  } else {
    console.log(`Plant ${JSON.stringify(plant)} matches.`);
    next();
  }
};

//Add and ID to the req.body being passed to the API Call.

exports.updateId = (req, res, next) => {
    //Example Function to add ID
  id++;
  req.body.id = id.toString();
  next();
};

exports.addPlant = (req, res, next) => {
  //add plant to gardin
  var plant = req.body;
  //plants should be switched to users gardin
  plants.push(plant);
  console.log(`plant ${JSON.stringify(plant)} added to database`);
  res.sendFile("/", { root: "./client/" });
};

exports.garden = (req, res, next) => {
  res.json(plants);
};

exports.getPlant = (req, res, next) => {
  res.json(plant);
};

exports.deletePlant = (req, res, next) => {
  var deleteItem = _.findIndex(plants, { id: req.params.id });
  console.log(deleteItem);
  if (!plants[deleteItem]) {
    res.status(500).send(`<h1>Error</h1>`);
  } else {
    plants.splice(deleteItem, 1);
    console.log(`${plants[deleteItem]} has been removed`);
    res.send(`<h1>${deleteItem} has been removed</h1>`);
  }
};
