const name = 'Ari';
const userAge = 23;

const user = {
	name,
	age: userAge,
	location: 'Brasil'
};

console.log(user);

const product = {
	label: 'notebook',
	price: 3,
	stock: 2,
	salePrice: undefined,
	rating: 2
};

const { label: l, stock, rating = 5 } = product;
console.log(l);

const transaction = (type, { label, stock }) => {
	console.log(type, label);
};

transaction('order', product);
