const User = require('../api/user/userModel')
const _ = require('lodash')
const logger = require('./logger')
require('dotenv').config()

const users = [
    {
        username: `${process.env.ADMINNAME}`,
        password: `${process.env.PASSWORD}`,
        email: "email@email.com",
        firstName: "admin",
        lastName: "admin",
        role: "admin"
    }, 
    {
        username: "user",
        password: "password123",
        email: "email@email.com",
        firstName: "user",
        lastName: "user"
    }

]

const createDoc = function(model, doc) {
    return new Promise(function(resolve, reject){
        const dbModel = new model
        _.assign(dbModel, doc)
        dbModel.save(function(err, saved){
            return err ? reject(err) : resolve(saved)
        })
    })
}

const createUser = function(data) {

    //create a promise that creats a doc for each user
    const promises = users.map(function(user){
        return createDoc(User, user)
    })
    //when all users docs are created merge the users
    //to the user database and pass it to the next
    //step in the promise
    return Promise.all(promises)
        .then(function(users){
            return _.merge({users: users}, data || {})
        })
}

User.find({username: "user"})
    .then(response => {
        if (response[0] === undefined) {
            createUser().then(logger.log('DB SEEDED'))
        } 
    })
    .catch(err => console.log(err))