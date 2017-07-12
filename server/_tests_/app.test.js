const request = require('supertest-as-promised')
const app = (require('../src/server/server'))

process.env.NODE_ENV = 'test'

describe('Test Login Get', () => {
    it('should send get request', () => {
        return request(app).get('/api/login')
            .then(response => {
                expect(response.statusCode)
                .toBe(200)
            })
    })
})

describe('Test Login POST', () => {
    const user = {
        username: "Test",
        password: "Password"
    }
    it('should return response failed', () => {
        return request(app).post('/api/login')
            .then()
    })
})