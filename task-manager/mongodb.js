const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database');
	}

	const db = client.db(databaseName);
	db
		.collection('users')
		.updateOne(
			{ _id: new ObjectId('61489c5ca0ff0774c5826f05') },
			{
				$set: {
					name: 'Ariel'
				}
			}
		)
		.then((result) => {
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
		});

	db
		.collection('tasks')
		.updateMany(
			{
				completed: false
			},
			{
				$set: {
					completed: true
				}
			}
		)
		.then((result) => {
			console.log(result.modifiedCount);
		})
		.catch((error) => {
			console.log(error);
		});
	db
		.collection('users')
		.deleteMany({
			age: 30
		})
		.then((result) => {
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
		});
});
