const { BCRYPT_WORK_FACTOR, SECRET_KEY, PORT, DB_URI } = require('../config.js');

// Test for Bug #3: Config Export
test('should properly configure environment variables', () => {
	const { BCRYPT_WORK_FACTOR, SECRET_KEY, PORT, DB_URI } = require('../config.js');
	expect(BCRYPT_WORK_FACTOR).toBeDefined();
	expect(SECRET_KEY).toBeDefined();
	expect(PORT).toBeDefined();
	expect(DB_URI).toBeDefined();
});

describe('Config Export Bug', () => {
	test('should export necessary variables', () => {
		const config = require('../config.js');
		const expectedSecretKey = process.env.SECRET_KEY || 'development-secret-key';
		expect(config.SECRET_KEY).toBe(expectedSecretKey);
		// other expectations...
	});
});