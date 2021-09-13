const request = require('request');
const geocode = require('./utils/geocode.js');
const fs = require('fs');

const dataJSON = fs.readFileSync('./utils/access_keys.json').toString();
const access_keys = JSON.parse(dataJSON);

const url = 'http://api.weatherstack.com/current?access_key=' + access_keys.weatherstack + '&query=37.8267,-122.4233';

request({ url: url, json: true }, (error, response) => {
	if (error) {
		console.log('Unable to connect to weather service');
	} else if (response.body.error) {
		console.log('Unable to find location');
	} else {
		const current = response.body.current;
		console.log(
			"It's " + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out.'
		);
	}
});

geocode('recife', (error, data) => {
	console.log(error);
	console.log(data);
});
