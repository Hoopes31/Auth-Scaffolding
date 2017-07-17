const Users = require("../user/userModel")

exports.root = (req, res, next) => {
    res.send('Admin Root')
}

exports.findAllUsers = (req, res, next) => {
    //let user = Users.findOne({username: {$exists: true}})
    Users.find({username: {$exists: true}})
    .then((result)=> {
        if (result) {
            res.json(result)
        } else {
            res.send('No users found')
        }
    })
    res.end()
}

exports.findUser = (req, res, next) => {
    Users.findOne({ username: req.query.username })
        .then((result) => {
            if(result) {
                return console.log(result)
            } else {
                return console.log('No result')
            }
        })
    res.end()
}

exports.deleteUser = (req, res, next) => {
    Users.find(One({ }))
}
