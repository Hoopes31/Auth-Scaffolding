const signUpRouter = require("express").Router();
const controller = require("./signUpController");

signUpRouter.route("/")
.get(controller.root)
.post(controller.createUser);

module.exports = signUpRouter;
