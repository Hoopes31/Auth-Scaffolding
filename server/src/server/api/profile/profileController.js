const logger = require("../../util/logger")

exports.root = (req, res) => {
    //Send data to client
    let user = req.user
    return res.json({user: user})
}