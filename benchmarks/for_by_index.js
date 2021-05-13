// $/for_by_index
'use strict'

module.exports = (array, size) => {
	let result = 0

	for (let i = 0; i < size; i++) {
		result ^= array[i]
	}
	return result
}
