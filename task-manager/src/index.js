const express = require('express');
require('./db/mongoose.js');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log('running');
});

const bcrypt = require('bcryptjs');
const myFunction = async () => {
	const pass = 'senha!';
	const hashedPass = await bcrypt.hash(pass, 8);

	console.log(pass);
	console.log(hashedPass);

	const isMatch = await bcrypt.compare(pass, hashedPass);
	console.log(isMatch);
};

myFunction();
