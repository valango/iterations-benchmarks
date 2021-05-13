// $/lodash_forEach
'use strict'
const { forEach } = require('lodash')

module.exports = (array) => {
	let result = 0

	forEach(array, (value) => {
		result ^= value
	})

	return result
}
