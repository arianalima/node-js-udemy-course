const request = require('request');
const fs = require('fs');

const dataJSON = fs.readFileSync('./utils/access_keys.json').toString();
const access_keys = JSON.parse(dataJSON);

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=' +
		access_keys.weatherstack +
		'&query=' +	latitude +	',' + longitude;

        request({ url: url, json: true }, (error, response) => {
            if (error) {
                callback('Unable to connect to weather service');
            } else if (response.body.error) {
                console.log(response.body.error)
                callback('Unable to find location');
            } else {
                const current = response.body.current;
                callback(undefined, 
                    "It's " + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out.'
                );
            }
        });

};


module.exports = forecast;
