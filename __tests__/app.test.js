const request = require('supertest');
const app = require('../app.js');

test('should not have extra module.exports', () => {
	expect(app).not.toHaveProperty('module');
});

test('should have app.get("/users")', () => {
	const routes = app._router.stack.filter((r) => r.route).map((r) => r.route.path);
	console.log(routes); // Log the routes
	expect(routes).toContain('/users');
});

test(`should deny access if no token provided`, async () => {
	const response = await request(app).get('/users');
	expect(response.statusCode).toBe(401);
});