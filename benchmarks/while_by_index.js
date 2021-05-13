// $/while_by_index
'use strict'

module.exports = (array, size) => {
	let result = 0, i = -1

	while (++i < size) {
		result ^= array[i]
	}
	return result
}
