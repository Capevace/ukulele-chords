const chords = require('../data/ukulele-chords-4.json');

const json = JSON.stringify(Object.keys(chords));
console.log(json);

//Object.keys(chords).forEach(chord => console.log(chord));