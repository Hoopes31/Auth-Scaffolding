const signUpRouter = require("express").Router();
const controller = require("./signUpcontroller");

signUpRouter.route("/").post(controller.createUser);

module.exports = signUpRouter;
