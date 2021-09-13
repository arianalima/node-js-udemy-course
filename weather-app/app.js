const request = require('request');
const fs = require('fs');

const dataJSON = fs.readFileSync('./utils/access_keys.json').toString();
const access_keys = JSON.parse(dataJSON);

const url = 'http://api.weatherstack.com/current?access_key='+access_keys.weatherstack+'&query=37.8267,-122.4233';

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

const gpsUrl =
	'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token='+access_keys.mapbox+'&limit=1';

request({ url: gpsUrl, json: true }, (error, response) => {
	if (error) {
		console.log('Unable to connect to mapbox service');
	} else {
		const content = response.body;
		if (content.features.length === 0) {
			console.log('Unable to find geolocation. Try to search a different term.');
		} else {
			const geocoding = content.features[0].geometry.coordinates;
			const longitude = geocoding[0];
			const latitude = geocoding[1];
			console.log(latitude, longitude);
		}
	}
});
