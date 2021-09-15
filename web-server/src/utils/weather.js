const request = require('request');
const fs = require('fs');
const path = require('path');

const dataJSON = fs.readFileSync(path.join(__dirname, 'access_keys.json')).toString();
const access_keys = JSON.parse(dataJSON);

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=' +
		access_keys.weatherstack +
		'&query=' +	latitude +	',' + longitude;

        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service');
            } else if (body.error) {
                console.log(body.error)
                callback('Unable to find location');
            } else {
                const current = body.current;
                callback(undefined, 
                    "It's " + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out.'
                );
            }
        });

};


module.exports = forecast;
