const fs = require('fs');
const notes = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const variants = [
	'', 'm', '5', 
	'7', 'm7', 'maj7', 
	'sus2', 'sus4', '7sus4',
	'6', 'm6', '9', 'm9',
	'aug', 'dim'
];

let content = '';

for (const note of notes) {
	for (const variant of variants) {
		const combo = `${note}${variant}`;
		const comboUrl = combo.replace(/\#/g, '_');

		content += `[${combo}]: https://www.ukulele-tabs.com/images/ukulele-chords/${comboUrl}.png\n`;
	}
}

fs.writeFileSync('References.md', content);