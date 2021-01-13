const path = require('path');
const fs = require('fs');

const { chords, keys, suffixes } = require('./chords');
const draw = require('./draw');

/**
 * List all chords.
 */ 
module.exports.listAllChords = function listAllChords() {
	for (const key of keys) {
		console.log(key);

		for (const suffix of suffixes) {
			console.log(key + suffix);
		}
	}
}

/**
 * Render a chord as SVG.
 *
 * @param {string} chord
 * @param {int} variation
 * @param {string|null} outputPath
 */ 
module.exports.renderChord = function renderChord(chord, variation = 0, outputPath = null) {
	const chordData = chords[chord][variation];

		if (!chordData) {
			console.error(`Chord ${chord} not found`);
			process.exit(1);
		} else {
			const svg = draw(chord, chordData);

			if (outputPath) {
				const file = path.extname(outputPath) // path contains extension?
					? outputPath
					: path.join(outputPath, `${chord}.svg`);

				console.log('Writing SVG to', file);
				fs.writeFileSync(file, svg);
			} else {
				// Pass SVG to stdout
				console.log(svg);
			}
		}
}

/**
 * Render all chords to SVG.
 *
 * @param {string|null} outputPath
 */ 
module.exports.renderAllChords = function renderAllChords(outputPath = null) {
	for (const chordName of Object.keys(chords)) {
		const chord = chords[chordName][0];

		if (!chord) continue;

		const file = path.join(outputPath || process.cwd(), `${chordName}.svg`);
		const svg = draw(chordName, chord);

		console.log('Writing', chordName, 'to', file);
		fs.writeFileSync(file, svg);
	}

	console.log('Finished!');
}


/**
 * Print markdown image references for the SVG files.
 *
 * @param {string|null} svgPath
 * @param {string|null} outputPath
 */ 
module.exports.printMarkdownReferences = function printMarkdownReferences(svgPath = null, outputPath = null) {
	let references = '';
	for (const chordName of Object.keys(chords)) {
		const file = svgPath
			? path.join(svgPath, `${chordName}.svg`)
			: `${chordName}.svg`;

		references += `[${chordName}]: ${file}\n`;
	}

	if (outputPath) {
		fs.writeFileSync(outputPath, references);
		console.log('References printed to', outputPath);
	} else {
		console.log(references);
	}
}

/**
 * Append markdown reference for chord to file.
 *
 * @param {string} chord The chord name
 * @param {string} mdFilePath Absolute path to markdown file to append to
 * @param {string|null} relativeSVGPath The relative SVG path to put in the reference
 */ 
module.exports.appendReference = function appendReference(chordName, mdFilePath, relativeSvgPath = null, force = false) {
	const filename = `${chordName}.svg`;
	const file = path.join(relativeSvgPath || '', filename);
	const reference = `\n[${chordName}]: ${file}`;

	if (fs.readFileSync(mdFilePath).toString().includes(reference) && !force) {
		console.error('File already contains reference to', chordName);
	} else {
		fs.appendFileSync(mdFilePath, reference);
		console.log('Reference for', chordName, 'printed to', mdFilePath);
	}
}

/**
 * Render chord and append markdown reference for it to file.
 *
 * @param {string} chord The chord name
 * @param {int} variation The chord variation
 * @param {string} mdFilePath Absolute path to markdown file to append to
 * @param {string} folderPath Absolute path to the folder containing SVGs
 * @param {string|null} relativeSVGPath The relative SVG path to put in the reference
 */ 
module.exports.renderAndAppendChord = function renderAndAppendChord(chordName, variation, mdFilePath, folderPath, relativeSvgPath = null) {
	const filename = `${chordName}.svg`;
	const file = path.join(relativeSVGPath || folderPath, filename);
	const reference = `\n[${chordName}]: ${file}`;

	renderChord(chordName, variation, path.join(folderPath, filename));
	appendReference(chordName, mdFilePath, relativeSvgPath);
}