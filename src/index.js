#! /usr/bin/env node --trace-warnings
const path = require('path');
const fs = require('fs');

// https://www.ukulele-tabs.com/images/ukulele-chords

const isUrl = require('is-url');
const urlJoin = require('url-join');
const { program } = require('commander');
const {
	listAllChords,
	renderChord,
	renderAllChords,
	printMarkdownReferences,
	appendReference,
} = require('./controller');

program
	.version(require('../package.json').version)
	.option('-c, --colors', 'draw finger colors');

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
	.action((chord, variation, cmd) => {
		renderChord(String(chord), parseInt(variation || 0), {
			outputPath: cmd.outputPath,
			fingerColors: program.colors,
		});
	});

program
	.command('all [folderPath]')
	.description('render all chords to SVG')
	.option('-v, --variations', 'render all variations as well')
	.action((outputPath, cmd) => {
		renderAllChords({
			outputPath: path.resolve(outputPath),
			fingerColors: program.colors,
			outputVariations: cmd.variations
		});
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
	.option(
		'-f, --force',
		'force append a reference (even if it already exists)'
	)
	.action((file, chords, cmd) => {
		// ChordSVGs
		const baseSvgPath =
			cmd.svgPath ||
			'https://raw.githubusercontent.com/Capevace/ukulele-chords/main/svgs';
		const pathIsUrl = isUrl(baseSvgPath);

		for (const chord of chords) {
			const svgPath = pathIsUrl
				? urlJoin(baseSvgPath, `${encodeURIComponent(chord)}.svg`)
				: path.join(baseSvgPath, `${chord}.svg`);

			appendReference(
				chord,
				svgPath,
				path.resolve(file),
				cmd.force || false
			);
		}
	});

program.parse(process.argv);
