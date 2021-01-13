const fs = require('fs');
let data = require('./ukulele-chords-3.json');

let newData = {};

for (const chord of Object.keys(data)) {
	newData[chord] = data[chord].map(variation => ({ ...variation, baseDisplayNote: undefined }));
}

fs.writeFileSync('ukulele-chords-4.json', JSON.stringify(newData, null, 2))

