
//set the NODE_ENV to test
process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../src/server/api/user/userModel')

//Require test dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../src/index')
let should = chai.should()
let user = {
        username: "Agent_007",
        firstName: "James",
        lastName: "Bond",
        email: "JamesBond@test.com",
        password: "testing123"
    }

chai.use(chaiHttp)

//POST: CREATE_USER
describe('SIGNUP: GOOD_USER', () => {

    it('CREATE_USER && RETURN_TOKEN', (done) => {
        chai.request(server)
            .post('/api/signUp')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('token')
                done()
            })
    })
})

//POST: DUPLICATE ACCOUNT
describe('SIGNUP: BAD_REQUEST', () => {

    //Remove User After Test
    after(function() {
        User.find({"username":"Agent_007"}).remove().exec()
    })
    it('DUPLICATE_ACCOUNTS', (done) => {
        chai.request(server)
            .post('/api/signUp')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.not.have.property('token')
                res.body.should.have.property('err')
                done()
            })
    })
})

//POST: MISSING_FIELDS   
let badUsers = [
        {
            username: null,
            firstName: "Archer",
            lastName: "Sterling",
            email: "Archer@test.com",
            password: "testing123",
            err: "NO USERNAME"
        },
        {
            username: "Agent",
            firstName: null,
            lastName: "Sterling",
            email: "Archer@test.com",
            password: "testing123",
            err: "NO FIRST_NAME"
        },
                    {
            username: "Agent",
            firstName: "Archer",
            lastName: null,
            email: "Archer@test.com",
            password: "testing123",
            err: "NO LAST_NAME"
        },
        {
            username: "Agent",
            firstName: "Archer",
            lastName: "Sterling",
            email: null,
            password: "testing123",
            err: "NO EMAIL"
        },
        {
            username: "Agent",
            firstName: "Archer",
            lastName: "Sterling",
            email: "Archer@gest.com",
            password: null,
            err: "NO PASSWORD"
        },
    ]

//mapping bad users and pushing err message for each unit test
    badUsers.map(user => {
        describe('/SIGNUP_BAD_USER:', () => {
            it(`DENY_BAD_USER: ${user.err}`, (done) => {
                chai.request(server)
                    .post('/api/signUp')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(400)
                        res.body.should.not.have.property('token')
                        res.body.should.have.property('err')
                        done()
                    })
        })
    })
})