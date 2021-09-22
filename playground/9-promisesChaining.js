const add = (x, y) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(x + y);
		}, 2000);
	});
};

// add(1, 2)
// 	.then((sum) => {
// 		console.log(sum);
// 		add(sum, 1)
// 			.then((sum) => {
// 				console.log(sum);
// 			})
// 			.catch((e) => {
// 				console.log(e);
// 			});
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

add(1, 1)
	.then((sum) => {
		console.log(sum);
		return add(sum, 1);
	})
	.then((sum) => {
		console.log(sum);
	})
	.catch((e) => {
		console.log(e);
	});
