<div align="center">
	<h1>🎶 Ukulele Chords – Table of Contents</h1>
	<p>
		<strong>Tuning:</strong> GCAE
	</p>
	<p>
    	<a href="https://github.com/capevace/ukulele-chords"><code>ukulele-chords</code> utility tool</a>
	</p>
</div>
<br>

## Installation
The `ukulele-chords` tool is available on NPM.
```sh
npm install -g ukulele-chords
```

## Usage
`ukulele-chords` supports the following commands (you can also display these using `ukulele-chords --help`):
- `ukulele-chords list`: List all available chords
- `ukulele-chords render <chord> [variation]`: List all available chords
	- `-o, --output-path <path>  the output path/file`
- `ukulele-chords all [folderPath]`: Render all chords to SVG
	- `-v, --variations  render all variations as well`
- `ukulele-chords append <file> <...chords>`
	- `-p, --svg-path <path>  the path to be used to link the svgs`
		This refers to the URL used for the image in the markdown image reference (e.g. `[E#]: PATH/E#.svg`). Defaults to this repos URLs.
	- `-f, --force            force append a reference (even if it already exists)`