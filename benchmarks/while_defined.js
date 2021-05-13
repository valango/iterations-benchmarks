// $/while_defined
'use strict'

module.exports = (array) => {
	let result = 0, i = -1, value

	while ((value = array[++i]) !== undefined) {
		result ^= value
	}
	return result
}
