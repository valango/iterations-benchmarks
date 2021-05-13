// $/for_of_entries
'use strict'

module.exports = (array) => {
	let result = 0

	for (const entry of array.entries()) {
		result ^= entry[1]
	}
	return result
}
