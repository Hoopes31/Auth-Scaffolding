//set NODE_ENV

process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../src/server/api/user/userModel')

//Require test dependencies

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../src/index')
let should = chai.should()

chai.use(chaiHttp)

//POST: LOGIN SUCCESS
describe('/POST Login:')
//POST: LOGIN FAIL

describe('/GET SignUp', () => {
    it('SIGN_UP_ROOT', (done) => {
        chai.request(server)
            .get('/api/signUp')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('token')
                done()
            })
    })
})