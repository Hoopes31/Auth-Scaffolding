//set NODE_ENV
process.env.NODE_ENV = 'test'

//Require test dependencies
const mongoose = require('mongoose')
const User = require('../src/server/api/user/userModel')
const signToken = require('../src/server/auth/auth').signToken
const _ = require('lodash')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const should = chai.should()

chai.use(chaiHttp)

//POST: LOGIN SUCCESS
describe('PROFILE: GOOD_TOKEN:', () => {
    //Create User and Grab Token
    before(function() {
        let user = {
            username: "Agent",
            firstName: "Archer",
            lastName: "Sterling",
            email: "Archer@test.com",
            password: "testing123"
        }

        //Create User
        newUser = new User
        _.assign(newUser, user)

        newUser.save(function(err, user) {
            if (err) {
                return res.status(422).json({ err: err.message });
                } 
        })
        token ='Bearer ' + signToken(newUser._id)
    })

    //Wipe User
    after(function() {
        User.find({"username":"Agent"}).remove().exec()
    })

    //Run Good User Test
    describe('TEST_GOOD_TOKEN', () => {
        it('PROFILE_SUCCESS', (done) => {
            chai.request(server)
                .post('/api/profile')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('token')
                    res.body.token.should.contain('Bearer')
                    res.body.should.not.have.property('err')
                    done()
                })
        })
    })
})