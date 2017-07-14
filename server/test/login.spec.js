//set NODE_ENV

process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../src/server/api/user/userModel')
const _ = require('lodash')

//Require test dependencies

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../src/index')
let should = chai.should()

chai.use(chaiHttp)

//POST: LOGIN SUCCESS
describe('LOGIN: GOOD_USER:', () => {
    //Create User
    before(function() {
        let user = {
            username: "Agent",
            firstName: "Archer",
            lastName: "Sterling",
            email: "Archer@test.com",
            password: "testing123"
        }
        newUser = new User
        _.assign(newUser, user)
        newUser.save()
    })
    //Wipe User
    after(function() {
        User.find({"username":"Agent"}).remove().exec()
    })

    describe('TEST_GOOD_USER', () => {
        it('LOGIN_SUCCESS', (done) => {

            let userLogin = {
                username: "Agent",
                password: "testing123"
            }
            chai.request(server)
                .post('/api/login')
                .send(userLogin)
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
//POST: LOGIN FAIL
describe('LOGIN: BAD_USER:', () => {

    let badUsers = [
        {
            username: "",
            password: "testing123",
            err: "No Username"
        },
        {
            username: "Agent",
            password: "",
            err: "No Password"
        },
        {
            username: "No_Name",
            password: "testing123",
            err: "Wrong Username"
        },
        {
            username: "Agent",
            password: "Wrong_Password",
            err: "Wrong Password"
        },
    ]
    badUsers.map(user => {
        it(`LOGIN_FAIL: ${user.err}`, (done) => {
            chai.request(server)
                .post('/api/login')
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.not.have.property('token')
                    done()
                })
        })
    })
})