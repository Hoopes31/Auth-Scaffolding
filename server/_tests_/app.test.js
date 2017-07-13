const request = require('supertest-as-promised')
const app = (require('../src/server/server'))

process.env.NODE_ENV = 'test'

//Get Root
describe('Test Login Get', () => {
    it('should send get request', () => {
        return request(app).get('/api/login')
            .then(response => {
                expect(response.statusCode).toBe(200)
            })
    })
})

//POST Request
describe('Login POST', () => {
    const user = {
        username:"testing123",
        password:"testing123"
    }
    //Check good credentials
    it('should return: token', () => {
        return request(app).post('/api/login')
            .send(JSON.stringify(user))
            .then((res) => {
                expect(res.body.status).toBe(200)
                expect(res.body.token).toContain('Bearer')
            })
    })
})
    //Check bad credentials
/*describe('BAD Login Post', () => {
    it('should reject: all cases', () => {
        const badUser = [
            {
                username: '',
                password: ''
            },
            {
                username: 'testing123',
                password: 'badPass'
            },
            {
                username: 'badUser',
                password: 'testing123'
            }
        ]
        return Promise.all(badUser.map(baduser => {
            return request(app).post('/api/login')
            .send(JSON.stringify(baduser))
            .then((res) => {
                expect(res.body.status).toBe(401)
                expect(res.body.message.startsWith('Bad Request')).toBe(true)
            })
        }))
    }) 
})
*/