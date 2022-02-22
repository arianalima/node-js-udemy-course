const express = require('express');
const User = require('../models/user.js');
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer')

router.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();

		res.status(201).send({ user, token});
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(404).send();
	}
});

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		})

		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'name', 'email', 'password', 'age' ];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'invalid params' });
	}

	try {
		updates.forEach((update) => {
			req.user[update] = req.body[update];
		});

		await req.user.save();

		res.send(req.user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove()
		res.send(req.user);
	} catch (error) {
		res.status(500).send();
	}
});

const upload = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, callback) {
		if (!file.originalname.match(/\.(webp|png|jpg|jpeg)$/)) {
			return callback(new Error ('File must be an image.'));
		}

		callback(null, true);
	}
});

router.post('/users/me/avatar', auth, upload.single('uploadName'), async (req, res) => {
	req.user.avatar = req.file.buffer;
	await req.user.save();
	res.send();
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message })
});

module.exports = router;
