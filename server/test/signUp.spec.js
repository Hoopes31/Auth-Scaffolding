
//set the NODE_ENV to test

process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../src/server/api/user/userModel')

//Require test dependencies

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../src/index')
let should = chai.should()

chai.use(chaiHttp)

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done()
        })
    })
    describe('/GET SignUp', () => {
        it('it should GET Sign Up Root', (done) => {
            chai.request(server)
                .get('/api/signUp')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('token')
                    done()
                })
        })
    })
    describe('/POST Sign Up: Create User Profile', () => {
        it('it should POST Create a New User and Return a Token', (done) => {

            let user = {
                username: "Agent",
                firstName: "Archer",
                lastName: "Sterling",
                email: "Archer@test.com",
                password: "testing123"
            }

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
    describe('/POST Sign Up Should FAIL:', () => {

        
        it('should not allow Sign Up', () => {
            chai.request(server)
                .post(user)
                .send((err, res) => {
                    res.should.have.status(401)
                })
        })
    })

})
