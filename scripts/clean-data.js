const fs = require('fs');
const { chords, keys, suffixes } = require('./src/chords');

// Cleanup scraped data
function cleanData(data) {
	let newData = {};

	for (const chord of Object.keys(data)) {
		newData[chord] = data[chord].map(variation => ({ ...variation, baseDisplayNote: undefined }));
	}

	return data;
}
//fs.writeFileSync('ukulele-chords-4.json', JSON.stringify(cleanData(data), null, 2));