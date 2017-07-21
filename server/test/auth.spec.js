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
chai.use(chaiHttp)

//POST: LOGIN SUCCESS
describe('AUTH:', () => {

    //create user to play with

    describe('Sign Token', () => {
        it('should return token', function() {
            id = '12345'
            auth.signToken(id).should.be.a('string')
        }) 
    })
    describe('Verify User', () => {

    })
    describe('Find One User', () => {
        
    })
    describe('Role Authorization', () => {
        
    })
})