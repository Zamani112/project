const request = require('supertest');
const { app, startServer } = require('../server');
const { pool, initializeDatabase } = require('../config/database');

beforeAll(async () => {
  await initializeDatabase();
  await startServer();
});

afterAll(async () => {
  await pool.end();
  // Close the server
  await new Promise(resolve => app.listen().close(resolve));
});

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'biger User',
        email: 'bigzam@example.com',
        password: 'tassword123',
        role: 'patient'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  // Add more tests here as needed
});