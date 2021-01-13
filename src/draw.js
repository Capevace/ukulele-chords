const { registerWindow } = require('@svgdotjs/svg.js');
const { createSVGWindow } = require('svgdom');
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

function fretsToChordBoxFrets(minFret, frets) {
	return frets.map((fret, i) => {
		return [i + 1, relativeFret(minFret, fret)];
	});
}

function caposToChordBoxBarres(minFret, capos, fixCapo = true) {
	return capos.map(
		(capo) => (
			{
				fret: 1 || relativeFret(minFret, capo.fret),
				fromString: capo.lastString + 1,
				toString: fixCapo ? 1 : capo.startString
			}
		)
	);
}

module.exports = function drawChord(chordName, chordData) {
	const chord = new ChordBox(document.documentElement, {
		width: 80,
		height: 120,
		circleRadius: 4,
		numStrings: 4,
		numFrets: 5,
		showTuning: false,
		defaultColor: "#666",
		bgColor: "#FFF",
		strokeColor: "#666",
		textColor: "#666",
		stringColor: "#666",
		fretColor: "#666",
		labelColor: "#666",
		fretWidth: 1,
		stringWidth: 1,
		fontSize: 14,
		fontWeight: 500
	});
	
	// chord.positionText = -10;

	chord.draw({
		chord: fretsToChordBoxFrets(chordData.fret, chordData.frets),
		position: chordData.fret,
		barres: caposToChordBoxBarres(chordData.fret, chordData.listCapos, true),
		tuning: ["G", "C", "A", "E"],
		positionText: -1.5,
		positionTextX: 65
	});
	
	chord.drawText(80 / 2, 80, chordName, {
		size: 15,
		weight: 500
	});

	return chord.canvas.svg();
}
