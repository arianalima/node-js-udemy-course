const geocode = require('./utils/geocode.js');
const forecast = require('./utils/weather.js');

geocode('recife', (error, data) => {
	console.log('Error', error);
	console.log(data);
});

forecast('-8.0642', '-34.8782', (error, data) => {
	console.log('Error', error);
	console.log(data);
});
