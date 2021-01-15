const fs = require('fs');
const { chords } = require('./src/chords');

// Cleanup scraped data
function cleanData(data) {
	let newData = {};

	for (const chord of Object.keys(data)) {
		newData[chord] = data[chord].map(variation => ({ ...variation, baseDisplayNote: undefined }));
	}

	return data;
}
//fs.writeFileSync('ukulele-chords-4.json', JSON.stringify(cleanData(data), null, 2));

const HOST_URL = 'https://raw.githubusercontent.com/Capevace/ukulele-chords/main/svgs/';
const RELATIVE_PATH = 'svgs/';
function chordDemoMarkdown(relative = true) {
	let output = '';

	for (const chord of Object.keys(chords)) {
		const variations = chords[chord];
		output += `## ${chord}\n`;

		for (const index in variations) {
			const varNum = parseInt(index) + 1;
			const filename = `${chord}${index === 0 ? '' : '-' + varNum}.svg`;

			output += `![${chord} | ${varNum}](${(relative ? RELATIVE_PATH : HOST_URL) + filename}) `;
		}

		output += '\n';
	}

	return output;
}

console.log(chordDemoMarkdown());