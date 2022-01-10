const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
// 	if (req.method === 'GET') {
// 		res.send('GET requests disabled');
// 	}
// 	next();
// });

// app.use((req, res, next) => {
// 	res.status(503).send('site under maintenance');
// 	next();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log('running');
});

const jwt = require('jsonwebtoken')

const myFunction = async () => {
	const token = jwt.sign({ _id: 'dummy' }, 'dummy2', { expiresIn: '7 days' });
	console.log(token);

	const data  = jwt.verify(token, 'dummy2');
	console.log(data);
}

myFunction();