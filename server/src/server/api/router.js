//This is your router bundle aka api combinator

const verifyUser = require('../auth/auth').verifyUser
const decodeToken = require('../auth/auth').decodeToken

const router = require('express').Router();
//setup route constants

const loginRoutes = require("../auth/loginRoutes");
const plantRoutes = require("./plant/plantRoutes");
const userRoutes = require("./user/userRoutes");
const signUpRoutes = require("./signUp/signUpRoutes");

//Add multiple router methods to your router export

router.use("/signUp", signUpRoutes);
router.use("/login", loginRoutes);
router.use("/plant", decodeToken(), verifyUser(), plantRoutes);
router.use("/user", decodeToken(), verifyUser(), userRoutes);

module.exports = router;
