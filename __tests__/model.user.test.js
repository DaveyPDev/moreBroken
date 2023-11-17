const User = require('../models/user'); // Import your User model
const db = require('../db'); // Import your db connection
const bcrypt = require('bcrypt'); // Import bcrypt to hash passwords

describe('User Model', () => {
    beforeEach(async () => {
        // Before each test, clear the users table
        await db.query('DELETE FROM users');
    });

    test('register creates a new user', async () => {
        const user = {
            username: 'testuser',
            password: 'password',
            first_name: 'Test',
            last_name: 'User',
            email: 'testuser@example.com',
            phone: '1234567890'
        };

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await User.register(user);

        // Check that the new user has the correct properties
        expect(newUser).toHaveProperty('username', user.username);
        expect(newUser).toHaveProperty('password');
        expect(newUser.password).not.toBe(user.password); // Password should be hashed
        expect(newUser).toHaveProperty('first_name', user.first_name);
        expect(newUser).toHaveProperty('last_name', user.last_name);
        expect(newUser).toHaveProperty('email', user.email);
        expect(newUser).toHaveProperty('phone', user.phone);

        // Check that the password was hashed correctly
        const passwordWasHashedCorrectly = await bcrypt.compare(user.password, newUser.password);
        expect(passwordWasHashedCorrectly).toBe(true);
    });
});