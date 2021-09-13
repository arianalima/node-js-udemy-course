const geocode = require('./utils/geocode.js');
const forecast = require('./utils/weather.js');
const fs = require('fs');

const dataJSON = fs.readFileSync('./utils/access_keys.json').toString();
const access_keys = JSON.parse(dataJSON);

geocode('recife', (error, data) => {
	console.log('Error', error);
	console.log(data);
});

forecast('-8.0642', '-34.8782', (error, data) => {
	console.log('Error', error);
	console.log(data);
});
