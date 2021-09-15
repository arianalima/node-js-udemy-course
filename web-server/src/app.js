const path = require('path');
const express = require('express');
const hbs = require('hbs');

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
	res.send({
		forecast: '30 degrees',
		location: 'somewhere'
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
