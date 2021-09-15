fetch('http://localhost:3000/weather?address=jhgjgj').then((response) => {
	response.json().then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			console.log(data.forecast, data.location);
		}
	});
});
