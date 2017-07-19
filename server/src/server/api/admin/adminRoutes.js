//Router grabs users by ID and performs functions

const adminRoutes = require('express').Router()
const controller = require('./adminController')

adminRoutes.route("/findUser")
    .get(controller.findID, controller.findUser)
    .delete(controller.findID, controller.deleteUser)
    .put(controller.findID, controller.roleUpdate)

adminRoutes.route("/findAllUsers")
    .get(controller.findAllUsers)
    .delete(controller.findID, controller.deleteUser)
    .put(controller.findID, controller.roleUpdate)

module.exports = adminRoutes