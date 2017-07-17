
const adminRoutes = require('express').Router()
const controller = require('./adminController')

adminRoutes.route("/")
    .get(controller.root)

adminRoutes.route(":username")
    .get(controller.findUser)
    .delete(controller.deleteUser)
    
adminRoutes.route("/findAll")
    .get(controller.findAllUsers)

module.exports = adminRoutes