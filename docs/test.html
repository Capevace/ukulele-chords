<form class="container">
	<input type="text" name="chord" class="chord-label">
</form>
<div class="container chords">
	
</div>

<style type="text/css">
	.container {
		width: 100%;
		justify-content: center;
		display: flex;
		flex-wrap: wrap;
	}

	.chord-label {
		font-size: 30px;
	}
</style>

<script type="text/javascript" src="/data/ukulele-chords-4.js"></script>
<script type="text/javascript">
	const label = document.querySelector('.chord-label');
	const chordsParent = document.querySelector('.chords');
	let currentChords = [];

	function setChords(chords = []) {
		currentChords = chords;

		chordsParent.innerHTML = '';

		const chordSVGs = chords.map(chord => {
			const e = document.createElement('img');
			e.currentChord = 0;
			e.key = chord.key;
			e.chords = chord.chords;

			if (!e.chords[e.currentChord]) {
				return;
			}

			e.src = `https://mateffy.me/ukulele-chords/svgs/${encodeURIComponent(chord.key)}${chord.index !== 0 ? '-' + String(chord.index + 1) : ''}.svg`;
			
			chordsParent.append(e);

			// e.addEventListener('click', event => {
			// 	if (e.currentChord < chord.chords.length - 1) {
			// 		e.currentChord++;
			// 	} else {
			// 		e.currentChord = 0;
			// 	}

			// 	if (!e.chords[e.currentChord]) {
			// 		e.currentChord = 0;
			// 		return;
			// 	}

			// 	e.src = `https://mateffy.me/ukulele-chords/svgs/${encodeURIComponent(chord.key)}${e.chords[e.currentChord] !== e.chords[0] ? '-' + String(e.currentChord + 1) : ''}.svg`;
			// });

			return e;
		});
	}

	label.addEventListener('input', e => {
		const chords = (CHORDS[label.value] || [])
				.map((variation, index) => ({ chords: [variation], key: label.value, index }));

		console.log(chords);

		setChords(chords);
	});
</script>