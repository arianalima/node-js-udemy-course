const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	fetch('http://localhost:3000/weather?address=' + searchElement.value).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				console.log(data.forecast, data.location);
			}
		});
	});
});
