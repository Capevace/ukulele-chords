const { registerWindow } = require('@svgdotjs/svg.js/dist/svg.node.js');
const { createSVGWindow } = require('../node_modules/svgdom/main-require.cjs');
const window = createSVGWindow();
const document = window.document;

registerWindow(window, document);

const ChordBox = require('./chord-box');

function relativeFret(mainFret = 5, fret = 5) {
	// We ignore 0 and -1 as those are special values
	if (fret === 0) {
		return fret;
	} else if (fret === -1) {
		return 'x';
	} else if (mainFret === 0) {
		return fret;
	}
	// // As long as the fret count is lower we assume
	// // the frets fit
	// else if (mainFret < 5) {
	// 	return fret;
	// }

	// If not we take the difference and add 1
	// to make what would be fret 0 (the first)
	// fret 1. Fret 0 would not be visible.
	return fret - mainFret + 1;
}

function fretsToChordBoxFrets(baseFret, frets, fingers) {
	return frets.map((fret, i) => {
		return [i + 1, relativeFret(baseFret, fret), null, fingers[i]];
	});
}

function caposToChordBoxBarres(baseFret, capos, fixCapo = true) {
	return capos.map((capo) => ({
		fret: relativeFret(baseFret, capo.fret),
		fromString: capo.lastString + 1,
		toString: fixCapo ? 1 : capo.startString,
	}));
}

module.exports = function drawChord(chordName, chordData, options = {}) {
	options = {
		fingerColors: false,
		...options
	}
	const chord = new ChordBox(document.documentElement, {
		width: 80,
		height: 120,
		circleRadius: 4,
		numStrings: 4,
		numFrets: 5,
		showTuning: false,
		defaultColor: '#666',
		bgColor: 'transparent',
		fingerColors: options.fingerColors 
			? ['#f45757', '#9e83ff', '#5ece4e', '#d2b92f']
			: [],
		fretWidth: 1,
		stringWidth: 1,
		fontSize: 14,
		fontWeight: 500,
	});

	// chord.positionText = -10;

	const maxFret = Math.max.apply(Math, chordData.frets);
	const baseFret = maxFret < 5
		? 0
		: chordData.fret;

	chord.draw({
		chord: fretsToChordBoxFrets(baseFret, chordData.frets, chordData.fingers),
		position: baseFret,
		barres: caposToChordBoxBarres(
			baseFret,
			chordData.listCapos,
			true
		),
		tuning: ['G', 'C', 'A', 'E'],
		positionText: -1.5,
		positionTextX: 65,
	});

	chord.drawText(80 / 2, 80, chordName, {
		size: 15,
		weight: 500,
		color: '#000'
	});

	return chord.canvas.svg();
};
