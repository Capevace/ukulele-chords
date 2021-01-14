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
 * @param {{ outputPath: string, fingerColors: boolean }} options
 */ 
module.exports.renderChord = function renderChord(chord, variation = 0, options) {
	options = {
		outputPath: null,
		fingerColors: false,
		...options
	};

	if (!chords[chord] || !chords[chord][variation]) {
		console.error(`Chord ${chord} not found`);
		process.exit(1);
	}

	const chordData = chords[chord][variation];

	const svg = draw(chord, chordData, { fingerColors: options.fingerColors });

	if (options.outputPath) {
		const file = path.extname(options.outputPath) // path contains extension?
			? options.outputPath
			: path.join(options.outputPath, `${chord}.svg`);

		console.log('Writing SVG to', file);
		fs.writeFileSync(file, svg);
	} else {
		// Pass SVG to stdout
		console.log(svg);
	}
}

/**
 * Render all chords to SVG.
 *
 * @param {{ outputPath: string, fingerColors: boolean }} options
 */ 
module.exports.renderAllChords = function renderAllChords(options) {
	options = {
		outputPath: null,
		fingerColors: false,
		...options
	};

	for (const chordName of Object.keys(chords)) {
		const chord = chords[chordName][0];

		if (!chord) continue;

		const file = path.join(options.outputPath || process.cwd(), `${chordName}.svg`);
		const svg = draw(chordName, chord, { fingerColors: options.fingerColors });

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
 * @param {string} svgPath The SVG path to put in the reference
 * @param {string} mdFilePath Absolute path to markdown file to append to
 * @param {boolean} force Force append even if reference already present
 */ 
module.exports.appendReference = function appendReference(chordName, svgPath, mdFilePath, force = false) {
	const reference = `\n[${chordName}]: ${svgPath}`;

	if (fs.readFileSync(mdFilePath).toString().includes(reference) && !force) {
		console.error('File already contains reference to', chordName);
	} else {
		fs.appendFileSync(mdFilePath, reference);
		console.log('Reference for', chordName, 'printed to', mdFilePath);
	}
}

// /**
//  * Render chord and append markdown reference for it to file.
//  *
//  * @param {string} chord The chord name
//  * @param {int} variation The chord variation
//  * @param {string} mdFilePath Absolute path to markdown file to append to
//  * @param {string} folderPath Absolute path to the folder containing SVGs
//  * @param {string|null} relativeSVGPath The relative SVG path to put in the reference
//  */ 
// module.exports.renderAndAppendChord = function renderAndAppendChord(chordName, variation, mdFilePath, folderPath, relativeSvgPath = null) {
// 	const filename = `${chordName}.svg`;
// 	const file = path.join(relativeSVGPath || folderPath, filename);
// 	const reference = `\n[${chordName}]: ${file}`;

// 	renderChord(chordName, variation, { outputPath: path.join(folderPath, filename) });
// 	appendReference(chordName, mdFilePath, relativeSvgPath);
// }