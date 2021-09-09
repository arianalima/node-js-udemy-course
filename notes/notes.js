const fs = require('fs');

function getNotes() {
	const notes = loadNotes();
	console.log(notes);
}

const addNote = function(title, body) {
	const notes = loadNotes();
	const duplicateNotes = notes.filter((note) => note.title === title);
	if (duplicateNotes.length === 0) {
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

const loadNotes = function() {
	try {
		const dataJSON = fs.readFileSync('notes.json').toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

const saveNotes = function(notes) {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

module.exports = { getNotes, addNote };
