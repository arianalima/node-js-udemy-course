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

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });
	return count;
};

updateAgeAndCount('614b4c66de0893c4a611e7ac', 20)
	.then((count) => {
		console.log(count);
	})
	.catch((e) => {
		console.log(e);
	});
