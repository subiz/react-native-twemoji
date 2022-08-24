// this file used to generate variable EMOJIS to cotains unicode and path to image

const fs = require('fs')

function emojiToString(emoji) {
	return `\n\t'${emoji.code}': require('./assets/svg/${emoji.filename}'),`
}

function main() {
	let content = ''
	let files = fs.readdirSync('./assets/svg')

	files.forEach((filename) => {
		let hex = filename.replace('.svg', '')
		content += emojiToString({code: fromCodePoint(hex), filename})
	})
	fs.writeFileSync('EMOJIS.js', 'const EMOJIS = {' + content + '\n}' + '\n' + 'module.exports = { EMOJIS }')
}

main()

// copy function from in scrips/build
// note the replace U200D => '\u200D' and UF0F => '\uFE0F'

function grabTheRightIcon(rawText) {
	// if variant is present as \uFE0F

	return toCodePoint(rawText.indexOf('\u200D') < 0 ? rawText.replace(/\uFE0F/g, '') : rawText)
}

function toCodePoint(unicodeSurrogates, sep) {
	var r = [],
		c = 0,
		p = 0,
		i = 0
	while (i < unicodeSurrogates.length) {
		c = unicodeSurrogates.charCodeAt(i++)
		if (p) {
			r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16))
			p = 0
		} else if (0xd800 <= c && c <= 0xdbff) {
			p = c
		} else {
			r.push(c.toString(16))
		}
	}
	return r.join(sep || '-')
}
function fromCodePoint(codepoint) {
	var code = typeof codepoint === 'string' ? parseInt(codepoint, 16) : codepoint
	if (code < 0x10000) {
		return String.fromCharCode(code)
	}
	code -= 0x10000
	return String.fromCharCode(0xd800 + (code >> 10), 0xdc00 + (code & 0x3ff))
}
