const express = require('express');
const Task = require('../models/task.js');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/tasks', async (req, res) => {
	try {
		await Task.find({}).then((tasks) => {
			res.send(tasks);
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'description', 'completed' ];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'invalid params' });
	}

	try {
		const task = await Task.findById(req.params.id);
		updates.forEach((update) => {
			task[update] = req.body[update];
		});
		await task.save();
		
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(400).send();
	}
});

router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
