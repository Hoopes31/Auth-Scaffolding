const loginRouter = require("express").Router();
const controller = require("./loginController");
const verifyUser = require("../../auth/auth").verifyUser;

//Login Root
loginRouter.route("/")
    .post(verifyUser(), controller.login);

module.exports = loginRouter;
