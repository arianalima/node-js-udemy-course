const add = (x, y) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (x < 0 || y < 0) {
				return reject('numbers must be positive');
			}
			resolve(x + y);
		}, 2000);
	});
};

const doWork = async () => {
	const sum = await add(-1, 2);
	const sum2 = await add(sum, 2);
	const sum3 = await add(sum2, 4);
	return sum3;
};

doWork()
	.then((result) => {
		console.log(result);
	})
	.catch((e) => {
		console.log(e);
	});
