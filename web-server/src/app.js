const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/weather.js');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Ariana'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Ariana'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'Get help at google.com',
		name: 'Ariana'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'address missing' });
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error: error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: error });
			}
			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.address
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404error', {
		title: '404 error',
		message: 'There is no subarticle for help'
	});
});

app.get('*', (req, res) => {
	res.render('404error', {
		title: '404 error',
		message: 'Sorry'
	});
});

app.listen(3000, () => {
	console.log('server');
});
