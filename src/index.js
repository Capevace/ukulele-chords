#! /usr/bin/env node
const path = require('path');
const fs = require('fs');

// https://www.ukulele-tabs.com/images/ukulele-chords

const { program } = require('commander');
const {
	listAllChords,
	renderChord,
	renderAllChords,
	printMarkdownReferences,
	appendReference
} = require('./controller');

program
	.version(require('../package.json').version);

program
	.command('list')
	.description('list all available chords')
	.action(() => {
		listAllChords();
	});

program
	.command('render <chord> [variation]')
	.description('render the chord as SVG')
	.option('-o, --output-path <path>', 'the output path/file', (outputPath) =>
		outputPath ? path.resolve(outputPath) : null
	)
	.action((chord, variation) => {
		renderChord(
			String(chord),
			parseInt(variation || 0),
			program.outputPath
		);
	});

program
	.command('all [folderPath]')
	.description('render all chords to SVG')
	.action((outputPath) => {
		renderAllChords(path.resolve(outputPath));
	});

program
	.command('references')
	.description('render markdown references')
	.option('-p, --svg-path <path>', 'the path to be used to link the svgs')
	.action((cmd) => {
		printMarkdownReferences(cmd.svgPath, program.outputPath);
	});

program
	.command('append <file> <chords...>')
	.description('append markdown reference to file')
	.option('-p, --svg-path <path>', 'the path to be used to link the svgs')
	.option('-f, --force', 'force append a reference (even if it already exists)')
	.action((file, chords, cmd) => {
		for (const chord of chords) {
			appendReference(chord, path.resolve(file), cmd.svgPath || 'ChordSVGs', cmd.force || false);
		}
	});

program.parse(process.argv);
