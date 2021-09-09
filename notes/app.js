const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');

yargs.command({
	command: 'add',
	describe: 'Add a new note',
	handler: function() {
		console.log('adding note');
	}
});

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	handler: function() {
		console.log('removing note');
	}
});

yargs.command({
	command: 'read',
	describe: 'Read a note',
	handler: function() {
		console.log('reading note');
	}
});

yargs.command({
	command: 'list',
	describe: 'Listing notes',
	handler: function() {
		console.log('listing notes');
	}
});

console.log(yargs.argv);
