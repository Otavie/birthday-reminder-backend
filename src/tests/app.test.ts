import request from 'supertest'
import app from '../app'
import { Server } from 'http'

describe('POST /birthdays', () => {
    let server: Server;

    beforeAll(() => {
        // Start the Server before running the tests
        server = app.listen(0);             // 0 will dynamically assign an available port
    })

    afterAll((done) => {
        // Close the server after running the tests
        server.close(done)
    })

    // Correct Details Format Validation
    it('should respond with status 201 when adding a new celebrant', async() => {
        const res = await request(app)
            .post('/birthdays')
            .send({ username: 'test-user', email: 'test-user@example.com', dateOfBirth: '2000-01-01' })
        expect(res.status).toBe(201)    
    }, 20000)

    // Missing email and dateOfBirth
    it('should respond with status 400 when missing required fields', async() => {
        const res = await request(app)
            .post('/birthdays')
            .send({ username: 'test-user' })        
        expect(res.status).toBe(400)
    })

    // Duplicate email
    it('should respond with status 400 when email is already in use', async () => {
        const res = await request(app)
            .post('/birthdays')
            .send({ username: 'test-user', email: 'test-user@example.com', dateOfBirth: '2000-01-01' })
        expect(res.status).toBe(400)
    })

    // Invalid data types
    it('should respond with status 400 when data types are invalid', async () => {
        const res = await request(app)
            .post('/birthdays')
            .send({ username: 1224, email: 'not-an-email', dateOfBirth: 'invalid-date' })
        expect(res.status).toBe(400)
    })
})