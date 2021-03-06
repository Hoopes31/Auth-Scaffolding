const Users = require("../user/userModel")

//Grab User ID
exports.findID = ( req, res, next) => {
    Users.findOne({ username: req.query.username })
        .then((response) => {
            if(response) {
                req.foundUserID = response._id
                req.role = response.role
                next()
            } else {
                res.send('No result')
            }
        })
}

//Returns first 20 users less than todays date
//Ordered by most recent user
//To paginate send last date on the reponse object as the paginationDate

exports.findAllUsers = (req, res, next) => {
    Users.find(
        { 
            $and:[
                {date: {$lt: req.query.paginationDate}},
                {username: {$exists: true}}
            ] },
                {__v: 0}
            )
        .select('-password -_id')
        .limit(20)
        .sort('-date')
        .then(response => res.json(response))
        .catch(err => res.send('No Users Found'))
}

//Return single user from username search
exports.findUser = (req, res, next) => {
    Users.findOne({ _id: req.foundUserID }, {__v: 0})
        .select('-password -_id')
        .then(response => res.json(response))
        .catch(err => res.send(err))
}

//Delete user by id
exports.deleteUser = (req, res, next) => {
    Users.find({_id: req.foundUserID}).remove().exec()
        .then(res.send(`User removed`))
        .catch(err => res.send(err))
}

//Role Update && Block Admin Promotion
exports.roleUpdate = (req, res, next) => {
    if (!req.query.roleUpdate || req.query.roleUpdate === 'admin') {
        res.status(400).send('You must enter a valid role.')
    } else {
        Users.findByIdAndUpdate(req.foundUserID, {role: req.query.roleUpdate}, {runValidators: true})
            .then(response => res.send(`${response.username}'s role has been updated to ${req.query.roleUpdate}`))
            .catch(err => res.send('You must use a defined role'))  
    }
}

//Prevent changes to admin
exports.adminPrivelage = (req, res, next) => {
    if (req.role === 'admin') {
        return res.status(403).send('Admins cannot be modified')
    } else {
        next()
    }
}