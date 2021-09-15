const request = require('request');
const fs = require('fs');
const path = require('path');

const dataJSON = fs.readFileSync(path.join(__dirname, 'access_keys.json')).toString();
const access_keys = JSON.parse(dataJSON);

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=' + access_keys.mapbox +
		'&limit=1';
	request({ url, json: true }, (error, { body:content }) => {
		if (error) {
			callback('Unable to connect to mapbox service');
		} else {
			if (content.features.length === 0) {
				callback('Unable to find geolocation. Try to search a different term.');
			} else {
				const features = content.features;
				const geocoding = features[0].geometry.coordinates;
				callback(undefined, {
					latitude: geocoding[1],
					longitude: geocoding[0],
					location: features[0].place_name
				});
			}
		}
	});
};

module.exports = geocode;
