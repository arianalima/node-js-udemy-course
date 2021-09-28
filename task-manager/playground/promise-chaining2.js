require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndRemove('614b642c1aeec27addb3ced1')
	.then((task) => {
		console.log(task);
		return Task.countDocuments({ completed: false });
	})
	.then((c) => {
		console.log(c);
	})
	.catch((e) => {
		console.log(e);
	});

const deleteAndCount = async (id) => {
	await Task.findOneAndDelete(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
};

deleteAndCount('614b642c1aeec27addb3ced1')
	.then((count) => {
		console.log(count);
	})
	.catch((e) => {
		console.log(e);
	});
