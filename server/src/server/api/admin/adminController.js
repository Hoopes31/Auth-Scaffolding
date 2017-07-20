const Users = require("../user/userModel")

//Grab User ID
exports.findID = ( req, res, next) => {
    Users.findOne({ username: req.query.username })
        .then((response) => {
            if(response) {
                req.foundUserID = response._id
                next()
            } else {
                res.send('No result')
            }
        })
}

//Return all users
//TODO: Setup chunking
exports.findAllUsers = (req, res, next) => {
    Users.find({username: {$exists: true}})
        .then(response => res.json(response))
        .catch(err => res.send('No Users Found'))
}

//Return single user from username search
exports.findUser = (req, res, next) => {
    Users.findOne({ _id: req.foundUserID })
        .then(response => res.json(response))
        .catch(err => res.send(err))
}

//Delete user by id
exports.deleteUser = (req, res, next) => {
    Users.find({_id: req.foundUserID}).remove().exec()
        .then(res.send(`user removed`))
        .catch(err => res.send(err))
}

//Role Update user by id
exports.roleUpdate = (req, res, next) => {
    Users.findByIdAndUpdate(req.foundUserID, {role: req.query.roleUpdate}, {runValidators: true})
        .then(response => res.send(`${response.username}'s role has been updated to ${response.role}`))
        .catch(err => res.send(err))
}
