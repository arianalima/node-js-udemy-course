const express = require('express');
require('./db/mongoose.js');
const User = require('./models/user.js');
const Task = require('./models/task.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get('/users', async (req, res) => {
	try {
		const users = await User.find({});

		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(404).send();
		}
		res.status(500).send(error);
	}
});

app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get('/tasks', async (req, res) => {
	try {
		await Task.find({}).then((tasks) => {
			res.send(tasks);
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findById({ _id });

		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(404).send();
		}
		res.status(500).send(error);
	}
});

app.listen(port, () => {
	console.log('running');
});
