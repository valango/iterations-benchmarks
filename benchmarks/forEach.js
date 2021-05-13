// $/forEach
'use strict'

module.exports = (array) => {
	let result = 0

	array.forEach((value) => {
		result ^= value
	})

	return result
}
