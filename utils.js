// $/utils
'use strict'

const { format } = require('util')

const fatal = (...args) => {
	process.stderr.write(format(...args))
	process.eexit(1)
}

/**
 * @param {string[]} strings
 * @returns {number}
 */
const maxLength = (strings) => strings.reduce((a, name) => Math.max(a, name.length), 0)

const print = (...args) => process.stdout.write(format(...args))

const usecsFrom = t0 => {
	const t1 = process.hrtime(t0)
	return (t1[0] * 1e9 + t1[1]) / 1000
}


module.exports = { fatal, maxLength, print, usecsFrom }
