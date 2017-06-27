var plantRouter = require("express").Router();
var controller = require("./plantController");
var decodeToken = require("../../auth/auth").decodeToken;
var getUser = require("../../auth/auth").getUser;

//Use decodeToken when you want to require a token for access to the page....Since you don't know how to save a token on the client ignore for now and set up APIs

plantRouter.get("/", controller.root);

//Grab a parameter and find its associated object export that object in next

plantRouter.param("id", decodeToken(), getUser(), controller.findPlantById);

//Learning Note: plant.param('quereyParam', function)

//Add a plant and attach an ID to it
//ID is being added with the updateID middleware we defined

plantRouter.post("/add", controller.addPlant);

//Show added plants
//Search a plant by ID using what was grabbed in .param earlier
plantRouter.get("/gardin", controller.garden);

plantRouter.get("/:id", controller.getPlant);

/*Searching by ID is returning no object...why?
  because the url must be searched as 'localhost:3000/1' NO SEMICOLIN
*/

//Delete a plant by ID
plantRouter.delete("/delete/:id", controller.deletePlant);

/*

"Post /addPlant:gardinID" : {
    "desc" : "Grab and store plant object in database return updated home page"
    "response" : "200 application/json"
    "data" : {}
}

"Put /plantWatered:plantID" : {
    "desc" : "Update associated ID's waterDate return updated home page"
    "response" : "200 application/json"
    "data" : {}
}

"Put /plantFed:plantID" : {
    "desc" : "Update associated ID's feedDate return updated home page"
    "response" : "200 application/json"
    "data" : {}
}

"Put /wateringSchedule:plantID" : {
    "desc" : "Update associated ID's watering schedule return updated home page"
    "response" : "200 application/json"
    "data" : {}
}

"Put /feedSchedule:plantID" : {
    "desc" : "Update associated ID's feed schedule return updated home page"
    "response" : "200 application/json"
    "data" : {}
}

"Delete /deletePlant:plantID" : {
    "desc" : "Remove the plant associated with ID and return updated home page"
    "response" : "200 application/json"
    "data" : {}
}

*/

module.exports = plantRouter;
