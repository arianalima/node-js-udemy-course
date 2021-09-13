const geocode = require('./utils/geocode.js');
const forecast = require('./utils/weather.js');

geocode('recife', (error, data) => {
	if (error) {
		return console.log('Error', error);
	}
	forecast(data.latitude, data.longitude, (error, forecastData) => {
		if (error) {
			return console.log('Error', error);
		}
		console.log(data.location);
		console.log(forecastData);
	});
});
