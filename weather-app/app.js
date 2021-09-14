const geocode = require('./utils/geocode.js');
const forecast = require('./utils/weather.js');

geocode('recife', (error, {latitude, longitude, location} = {}) => {
	if (error) {
		return console.log('Error', error);
	}
	forecast(latitude, longitude, (error, forecastData) => {
		if (error) {
			return console.log('Error', error);
		}
		console.log(location);
		console.log(forecastData);
	});
});
