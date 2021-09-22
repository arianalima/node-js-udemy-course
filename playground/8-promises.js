const doWorkPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
        resolve('success');
		// reject('error');
	}, 2000);
});

doWorkPromise
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.log(error);
	});

//---------------------------------------

const doWorkCallback = (callback) => {
    setTimeout(()=>{
        // callback('error',undefined)
        callback(undefined,'success')
    },2000)
};

doWorkCallback((error, result) => {
    if (error){
        return console.log(error)
    }
    console.log(result)
});