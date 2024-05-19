const { register } = require('../controllers/authController');

describe('Auth Controller', () => {
  test('should register a new user', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'password123'
      }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };
    await register(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
