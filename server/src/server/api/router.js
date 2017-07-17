//This is your router bundle aka api combinator

//Grab methods
const router = require("express").Router();
const decodeToken = require("../auth/auth").decodeToken;
const getUser = require("../auth/auth").getUser;
const roleAuthorization = require('../auth/auth').roleAuthorization

//setup route constants

const loginRoutes = require("./login/loginRoutes");
const signUpRoutes = require("./signUp/signUpRoutes");
const profileRoutes = require("./profile/profileRoutes");
const adminRoutes = require("./admin/adminRoutes")

//Add multiple router methods to your router export

router.use("/signUp", signUpRoutes);
router.use("/login", loginRoutes);
router.use("/profile", decodeToken, getUser, roleAuthorization(['user', 'admin']), profileRoutes);
router.use("/admin", decodeToken, getUser, roleAuthorization(['user', 'admin']), adminRoutes)

module.exports = router;
