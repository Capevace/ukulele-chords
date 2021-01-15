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

const RELATIVE_PATH = '../../svgs/';
function renderChordPages() {
	for (const key of keys) {
		let output = `<div align="center">
	<h1>🎶 Ukulele Chords – ${key}</h1>
	<p>
		<strong>Tuning:</strong> GCAE
	</p>
	<p>
    	<a href="https://github.com/capevace/ukulele-chords"><code>ukulele-chords</code> utility tool</a>
	</p>
	<br>
	<p>
		${suffixes
			.map(suffix => key + suffix)
			.filter(chord => !!chords[chord])
			.sort()
			.map(chord => `<a href="#${chord}">${chord}</a>`)
			.join(', ')
		}
	</p>
</div>
<br>\n\n
`;

		for (const suffix of suffixes) {
			const chord = key + suffix;
			const variations = chords[chord];

			if (!variations)
				continue;

			output += `## ${chord}\n\n`;

			for (let index in variations) {
				index = parseInt(index);
				const varNum = parseInt(index) + 1;
				const filename = `${chord}${index === 0 ? '' : '-' + varNum}.svg`;

				output += `![${chord} | ${varNum}](${RELATIVE_PATH + filename}) `;
			}

			output += '\n\n';
		}

		fs.writeFileSync(`docs/chords/${key}.md`, output);
	}
}

function renderChordsTOC() {
	let output = `<div align="center">
	<h1>🎶 Ukulele Chords – Table of Contents</h1>
	<p>
		<strong>Tuning:</strong> GCAE
	</p>
	<p>
    	<a href="https://github.com/capevace/ukulele-chords"><code>ukulele-chords</code> utility tool</a>
	</p>
</div>
<br>\n\n`;
	for (const key of keys) {
		output += `[${key}](chords/${key}.md)\n\n`;
	}

	fs.writeFileSync('docs/index.md', output);
}

renderChordsTOC();
renderChordPages();