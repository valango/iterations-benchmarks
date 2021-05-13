// $/for_of
'use strict'

module.exports = (array) => {
	let result = 0

	for (const value of array) {
		result ^= value
	}
	return result
}
