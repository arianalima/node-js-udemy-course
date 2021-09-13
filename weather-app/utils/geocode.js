const request = require('request');
const fs = require('fs');

const dataJSON = fs.readFileSync('./utils/access_keys.json').toString();
const access_keys = JSON.parse(dataJSON);

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=' + access_keys.mapbox +
		'&limit=1';
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to mapbox service');
		} else {
			const content = response.body;
			if (content.features.length === 0) {
				callback('Unable to find geolocation. Try to search a different term.');
			} else {
				const features = content.features;
				const geocoding = features[0].geometry.coordinates;
				callback(undefined, {
					latitude: geocoding[0],
					longiude: geocoding[1],
					location: features[0].place_name
				});
			}
		}
	});
};

module.exports = geocode;
