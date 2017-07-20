//set NODE_ENV
process.env.NODE_ENV = 'test'

//Require test dependencies
const mongoose = require('mongoose')
const User = require('../src/server/api/user/userModel')
const _ = require('lodash')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/index')
const should = chai.should()
const auth = require('../src/server/auth/auth')
const assert = chai.assert
chai.use(chaiHttp)

//POST: LOGIN SUCCESS
describe('AUTH: decodeToken', () => {
    it('should deny token', function() {
        req = {
            Authorization: "ABC"
        }
        assert.equal(auth.decodeToken(req), "err")
    }) 
})