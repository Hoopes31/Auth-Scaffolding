const User = require('../api/user/userModel')
const _ = require('lodash')
const logger = require('./logger')

logger.log('Seeding Database')

const users = [
    {
        username: "testing123",
        password: "testing123",
        email: "email@email.com",
        firstName: "Archer",
        lastName: "Sterling",
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

const cleanDB = function() {
    logger.log('Cleaning DB')
    const cleanPromises = [User]
        .map(function(model) {
            return model.remove().exec()
        })
        return Promise.all(cleanPromises)
}

const createUsers = function(data) {
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
        .then(response => {return 'DB Seeeded'})
}

cleanDB()
    .then(createUsers)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger))