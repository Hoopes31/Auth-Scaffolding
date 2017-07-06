const profileRouter = require("express").Router()
const controller = require("./profileController")
const decodeToken = require("../../auth/auth").decodeToken
const getUser = require("../../auth/auth").getUser

//profile root

profileRouter
    .route("/")
    .get(controller.root)

module.exports = profileRouter