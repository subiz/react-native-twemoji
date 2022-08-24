const lo = require('lodash')
const EMOJIS = require('./EMOJIS.js').EMOJIS

export default function ({emojiCode, size, ...props}) {
	let image = EMOJIS[emojiCode]
	if (!image) return

	size = parseInt(size) || 16
	let Emoji = image.default
	return <Emoji {...props} width={size} height={size} />
}
