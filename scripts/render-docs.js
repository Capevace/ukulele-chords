const fs = require('fs');
const path = require('path');
const { chords, keys, suffixes } = require('../src/chords');

const URL = 'https://raw.githubusercontent.com/Capevace/ukulele-chords/main/svgs/';
const RELATIVE_PATH = '../../svgs/';

function renderChordPages() {
	for (const key of keys) {
		let output = `[← Back to Keys](../../README.md)

<div align="center">
	<h1>🎶 Ukulele Chords – ${key}</h1>
	<p>
		<strong>Tuning:</strong> GCAE
	</p>
	<p>
    	<a href="https://github.com/capevace/ukulele-chords"><code>ukulele-chords</code> utility tool</a>
	</p>
	<br>
	<p>
		${[key, ...suffixes.map(suffix => key + suffix)] // Include the key as well (so we have C instead of Cmaj as well)
			.filter(chord => !!chords[chord])
			.map(chord => `<a href="#${chord.toLowerCase().replace(/\#/g, '')}">${chord}</a>`)
			.join(', ')
		}
	</p>
</div>
<br>\n\n
`;
		function renderWithSuffix(suffix) {
			const chord = key + suffix;
			const variations = chords[chord];

			if (!variations)
				return;

			output += `## ${chord}\n\n`;

			for (let index in variations) {
				index = parseInt(index);
				const varNum = parseInt(index) + 1;
				const filename = encodeURIComponent(`${chord}${index === 0 ? '' : '-' + varNum}.svg`);

				output += `![${chord} - ${varNum}](${URL + filename}) `;
			}

			output += '\n\n';
		}

		// Render major chords without suffixes (e.g. C instead of Cmaj)
		renderWithSuffix('');

		for (const suffix of suffixes) {
			renderWithSuffix(suffix);
		}

		fs.writeFileSync(path.resolve(__dirname, `../docs/chords/${key}.md`), output);
	}
}

function renderChordsTOC() {
	let chords = '';
	for (const key of keys) {
		chords += `### [${key}](chords/${key}.md)\n\n`;
	}

	let output = `<div align="center">
	<h1>🎶 Ukulele Chords – Table of Contents</h1>
	<p>
		<strong>Tuning:</strong> GCAE
	</p>
	<p>
    	<a href="https://github.com/capevace/ukulele-chords"><code>ukulele-chords</code> utility tool</a>
	</p>
</div>
<br>\n\n

## CLI Usage
For info on how to use the command-line tool, please refer to the [Usage](usage.md) page.

## List of Keys
${chords}
`;

	fs.writeFileSync(path.resolve(__dirname, 'docs/index.md'), output);
}

// renderChordsTOC();
renderChordPages();