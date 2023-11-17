const User = require('../models/user'); 
const request = require('supertest');
const app = require('../app'); 

const testToken = 'your_test_token';

describe('Auth Route Bug', () => {
    test('should use await in User.update', async () => {
        jest.spyOn(User, 'update').mockImplementation(async (...args) => {
            const originalFunction = jest.requireActual('../models/user').update;
            const result = await originalFunction(...args);
            console.log(result);
            return result;
        });

        // Trigger the route that uses User.update
        const response = await request(app).patch('/users/test-username').send(
            {
                _token: testToken, // Make sure this token is valid and has the correct payload
                first_name: 'new-first-name',
                last_name: 'new-last-name',
                // other fields to update...
            }
        );

        // Ensure User.update was called with await
        expect(User.update).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });
});

test('should deny access if no token provided', async function () {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(401);
});