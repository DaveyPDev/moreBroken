const timeWord = require('./timeWord');

describe('#timeword', () => {
	test('it is a function', () => {
		expect(typeof timeWord).toBe('function');
	});

	test('should convert 14:30 to "Two Thirty PM"', () => {
		const result = timeWord('14:30');
		expect(result).toBe('Two Thirty PM');
	});

	test('should convert 12:00 to "Noon"', () => {
		const result = timeWord('12:00');
		expect(result).toBe('Noon');
	});

	test('should convert 00:00 to "Midnight"', () => {
		const result = timeWord('00:00');
		expect(result).toBe('Midnight');
	});
  
});
