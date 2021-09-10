const chalk = require('chalk');
const fs = require('fs');

const listNotes = () => {
	const notes = loadNotes();
	if (notes.length > 0) {
		console.log(chalk.blueBright('Notes:'));
		notes.map((note) => console.log(note.title));
	} else {
		console.log("There aren't any notes");
	}
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((note) => note.title === title);
	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body
		});
		saveNotes(notes);
		console.log('Note saved');
	} else {
		console.log('Title already exists');
	}
};

const loadNotes = () => {
	try {
		const dataJSON = fs.readFileSync('notes.json').toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const removeNote = (title) => {
	const notes = loadNotes();
	const updatedNotes = notes.filter((note) => note.title != title);
	if (updatedNotes.length != notes.length) {
		saveNotes(updatedNotes);
		console.log(chalk.bgGreen('Note removed'));
	} else {
		console.log(chalk.bgRed("Note doesn't exist"));
	}
};

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => note.title === title);
	if (note) {
		console.log(chalk.magentaBright(note.title));
		console.log(note.body);
	} else {
		console.log(chalk.red('Note not found'));
	}
};

module.exports = { saveNotes, addNote, removeNote, listNotes, readNote };
