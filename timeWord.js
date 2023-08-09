function timeToWords (timeStr) {
	const timeParts = timeStr.split(':');
	const hours = parseInt(timeParts[0]);
	const minutes = parseInt(timeParts[1]);

	const hourWords = [
		'Twelve',
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seve',
		'Eight',
		'Nine',
		'Ten',
		'Eleven'
	];

	const minuteWords = [
		'',
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seven',
		'Eight',
		'Nine',
		'Ten',
		'Eleven',
		'Twelve',
		'Thirteen',
		'Fourteen',
		'Fifteen',
		'Sixteen',
		'Seventeen',
		'Eighteen',
		'Nineteen',
		'Twenty',
		'Twenty-One',
		'Twenty-Two',
		'Twenty-Three',
		'Twenty-Four',
		'Twenty-Five',
		'Twenty-Six',
		'Twenty-Seven',
		'Twenty-Eight',
		'Twenty-Nine',
		'Thirty',
		'Thirty-One',
		'Thirty-Two',
		'Thirty-Three',
		'Thirty-Four',
		'Thirty-Five',
		'Thirty-Six',
		'Thirty-Seven',
		'Thirty-Eight',
		'Thirty-Nine',
		'Forty',
		'Forty-One',
		'Forty-Two',
		'Forty-Three',
		'Forty-Four',
		'Forty-Five',
		'Forty-Six',
		'Forty-Seven',
		'Forty-Eight',
		'Forty-Nine',
		'Fifty',
		'Fifty-One',
		'Fifty-Two',
		'Fifty-Three',
		'Fifty-Four',
		'Fifty-Five',
		'Fifty-Six',
		'Fifty-Seven',
		'Fifty-Eight',
		'Fifty-Nine'
	];

	let period = 'AM';
	if (hours >= 12) {
		period = 'PM';
	}

	if (hours === 0 && minutes === 0) {
		return 'Midnight';
	}
	else if (hours === 12 && minutes === 0) {
		return 'Noon';
	}
	else if (hours === 0) {
		return `Twelve ${minuteWords[minutes]} ${period}`;
	}
	else {
		return `${hourWords[hours % 12]} ${minuteWords[minutes]} ${period}`;
	}
}

// Example
const timeString = '14:30'; // 2:30 PM
const words = timeToWords(timeString);
console.log(words); // Output: 'Two Thirty PM'
console.log(timeToWords('12:00')); // Output: 'Noon'
console.log(timeToWords('00:00')); // Output: 'Midnight'
