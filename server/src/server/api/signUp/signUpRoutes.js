const signUpRouter = require("express").Router();
const controller = require("./signUpController");

signUpRouter.route("/")
    .post(controller.createUser);

module.exports = signUpRouter;
