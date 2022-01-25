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

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
	
		const task = await Task.findById('61effd257032b00c64ef1137')
		await task.populate('owner');
		console.log(task.owner);

		const user = await User.findById('61effd1a7032b00c64ef1131');
		await user.populate('tasks')
		console.log(user.tasks);
}

main()