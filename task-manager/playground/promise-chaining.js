require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('614b4c66de0893c4a611e7ac', { age: 1 })
	.then((user) => {
		console.log(user);
		return User.countDocuments({ age: 1 });
	})
	.then((result) => {
		console.log(result);
	})
	.catch((e) => {
		console.log(e);
	});
