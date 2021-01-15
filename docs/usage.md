<div align="center">
	<h1>🎶 Ukulele Chords – Usage Guide</h1>
</div>
<br>

## Installation
The `ukulele-chords` tool is available on NPM.
```sh
npm install -g ukulele-chords
```

## Usage
*ukulele-chords* supports the following commands (you can also display these using `ukulele-chords --help`):

### `list`: 
**List all available chords.**

### `render <chord> [variation]`: 
**Render a chord as SVG.**
- *-o, --output-path &lt;path&gt;*: The output path/file (if empty SVG will be printed to stdout)

### `all [folderPath]`: 
**Render all chords to SVG.**
- *-v, --variations*: Render all variations as well

### `append <file> <...chords>`: 
**Append a markdown image reference (to the chord SVG) to a file.**
- *-p, --svg-path &lt;path&gt;*: The path to be used to link the svgs. This refers to the URL used for the image in the markdown image reference (e.g. `[E#]: PATH/E#.svg`). Defaults to this repos URLs.
- *-f, --force*: force append a reference (even if it already exists)`