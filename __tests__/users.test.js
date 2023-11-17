process.env.NODE_ENV = 'test';

const app = require('../app');
const request = require('supertest');
const db = require('../db');
const bcrypt = require('bcrypt');
const createToken = require('../helpers/createToken');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_KEY } = require('../config');
const testToken = jwt.sign({ username: 'test-username', is_admin: false }, SECRET_KEY);

// Tokens for our sample users
const tokens = {};

/** Before each test, insert u1, u2, and u3 [u3 is admin] */
beforeEach(async function () {
	async function _pwd (password) {
		return await bcrypt.hash(password, 1);
	}

	let sampleUsers = [
		[ 'u1', 'fn1', 'ln1', 'email1', 'phone1', await _pwd('pwd1'), false ],
		[ 'u2', 'fn2', 'ln2', 'email2', 'phone2', await _pwd('pwd2'), false ],
		[ 'u3', 'fn3', 'ln3', 'email3', 'phone3', await _pwd('pwd3'), true ]
	];

	for (let user of sampleUsers) {
		const hashedPassword = await bcrypt.hash(user[5], 1);
		await db.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)', user);
		tokens[user[0]] = createToken(user[0], user[6], hashedPassword);
	}
});

describe('Router Express Init Bug Test', () => {
	test('Router init Correctly', async () => {
		const res = await request(app).get('/users');
		expect(res.status).toBe(200);
	});
});

// Test for Bug #2: Admin
describe('PATCH /users/[username]', function () {
  test('should deny access if no token provided', async function () {
    const response = await request(app).patch('/users/u1');
    expect(response.statusCode).toBe(401);
  });

  test('should deny access if not admin/right user', async function () {
    const response = await request(app).patch('/users/u1').send({ _token: tokens.u2 });
    expect(response.statusCode).toBe(401);
  });

  test('should patch data if admin', async function () {
    const response = await request(app).patch('/users/u1').send({ _token: tokens.u3, first_name: 'new-fn1' });
    expect(response.statusCode).toBe(201);
    expect(response.body.user).toEqual({
      username: 'u1',
      first_name: 'new-fn1',
      last_name: 'ln1',
      email: 'email1',
      phone: 'phone1',
      admin: false,
    });
  });

  test('should return 404 if user not found', async function () {
    const response = await request(app).patch('/users/not-a-user').send({ _token: tokens.u3, first_name: 'new-fn' });
    expect(response.statusCode).toBe(404);
  });

  test('should deny access if not admin/right user', async function () {
    const response = await request(app).patch('/users/u1').send({ _token: tokens.u2 });
    expect(response.statusCode).toBe(401);
  });
});


describe('Auth Route Bug', () => {
	test('should use await in User.update', async () => {
		jest.spyOn(User, 'update').mockImplementation(async (...args) => {
			const originalFunction = jest.requireActual('../models/user').update;
			const result = await originalFunction(...args);
			console.log(result);
			return result;
		});

		// Trigger the route that uses User.update
		const response = await request(app).patch('/users/u1').send(
			{
				_token: tokens.u3, // Make sure this token is valid and has the correct payload
				first_name: 'new-fn1',
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
	expect(response.body).toEqual({ message: 'Unauthorized' }); // Adjust this based on your actual response
});

// Clean up after each test
afterEach(async function () {
	await db.query('DELETE FROM users');
});

// Close the database connection after all tests
afterAll(function () {
	db.end();
});
