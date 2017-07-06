const loginRouter = require("express").Router();
const controller = require("./loginController");
const verifyUser = require("../../auth/auth").verifyUser;

//Login Root
loginRouter
  .route("/")
  .get(controller.root)
  .post(verifyUser(), controller.login);

/*

"Post /login" : {
    "desc" : "Grab users credentials, authenticate and send home page"
    "response" : "200 application/json"
    "data" : {}
    }

"Post /logout: : {
    "desc" : "close user access to the portal"
    "response" : "200 application/json"
    "data" : "/"
}

*/

//Note on export syntax: Exporting without the function execution initiated allows the loginRoutes to 'chill' until called.

module.exports = loginRouter;
