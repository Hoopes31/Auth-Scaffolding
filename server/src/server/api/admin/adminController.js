const Users = require("../user/userModel")

exports.root = (req, res, next) => {
    res.send('Admin Root')
}

//Return all users
//TODO: Setup chunking
exports.findAllUsers = (req, res, next) => {
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

//Return single user from username search
exports.findUser = (req, res, next) => {
    Users.findOne({ username: req.query.username })
        .then((result) => {
            if(result) {
                console.log(result)
                return res.json(result)
            } else {
                return console.log('No result')
            }
        })
    res.end()
}

//Delete user by id
exports.deleteUser = (req, res, next) => {
    Users.find({_id: req.foundUser})
        .then(response => {
            if(response){
                console.log('This user dies ' + response)
            }
        })
}
