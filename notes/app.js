const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note text',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv) {
		notes.addNote(argv.title, argv.body);
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

yargs.parse();
