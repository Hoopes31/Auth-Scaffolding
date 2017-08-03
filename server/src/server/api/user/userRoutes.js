//For updating profile settings

var userRouter = require("express").Router();

userRouter.route("/").get(function(req, res, next) {
  console.log("User Route ping'd");
  res.send("Welcome to the user Route");
});

//Grab All Users

//Delete User

/*

"Get / " : {
    "desc" : "send slashpage"
    "response" : "200 application"
    "data" : "n/a"
}

//Mutating User Info

"Put /updateProfile:?" : {
    "desc" : "grab queried item and update its contents to match user input, return updated profile page"
    "response" : "200 application/json"
    "data" {}
}

"Delete /deleteProfile:?" : {
    "desc" : "delete user from database, remove user.id from garden.users[] send 'hope to see you soon' page"
    "response" : "200 application/json"
    "data" {}
}

//Add Garden

"Get /house:id" : {
    "desc" : "the users house"
    "response" : "200 application/json"
    "data" : {} 
}

*/
module.exports = userRouter;
