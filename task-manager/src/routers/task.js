const express = require('express');
const Task = require('../models/task.js');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id
	});
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/tasks', auth, async (req, res) => {
	const taskQuery = { owner: req.user._id }

	if (req.query.completed) {
		taskQuery.completed = req.query.completed === ('true' || 'false')
	}
	
	try {
		await Task.find(taskQuery).then((tasks) => {
			res.send(tasks);
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOne({ _id, owner: req.user._id })

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

router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'description', 'completed' ];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'invalid params' });
	}

	try {
		const task = await Task.findOne({ id: req.params.id, owner: req.user._id });
		
		if (!task) {
			return res.status(404).send();
		}

		updates.forEach((update) => {
			task[update] = req.body[update];
		});

		await task.save();
		res.send(task);
	} catch (error) {
		res.status(400).send();
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ id: req.params.id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
