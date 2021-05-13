// $/for_of_iterator
'use strict'

module.exports = (array) => {
	let result = 0

	for (const entry of array[Symbol.iterator]()) {
		result ^= entry
	}
	return result
}
