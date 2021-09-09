const fs = require('fs');

const dataJSON = fs.readFileSync('1-json.json').toString();
const person = JSON.parse(dataJSON);
person.name = 'Ariana';
person.age = 23;
const personJSON = JSON.stringify(person);
fs.writeFileSync('1-json.json', personJSON);
