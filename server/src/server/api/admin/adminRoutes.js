
const adminRoutes = require('express').Router()
const controller = require('./adminController')

adminRoutes.route("/")
    .get(controller.root)

adminRoutes.route("/findUser")
    .get(controller.findUser)
    .post(controller.deleteUser)

adminRoutes.route("/findAll")
    .get(controller.findAllUsers)

//Write a middleware function for grabbing IDs
//This sets up Search & Delete
module.exports = adminRoutes