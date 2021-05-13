// $/index
'use strict'
const { fatal, maxLength, print, usecsFrom } = require('./utils')
const { readdirSync } = require('fs')
const { join, sep } = require('path')
const os = require('os')

const SIZE = 1000000

let array = Array(SIZE), small = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let comment = 'native Array'

if (process.argv[2] && process.argv[2][0] === 't') {
	try {
		array = new Uint16Array(SIZE)
		comment = 'Uint16Array'
	} catch (error) {
		fatal('This javascript version does not support Uint16Array!\n')
	}
}

for (let i = 0; i < SIZE; i += 1) {
	array[i] = Math.floor(100 * Math.random())
}

const benchmarksDir = join(process.cwd(), sep, 'benchmarks', sep)

const loadables = readdirSync(benchmarksDir).map(filename => {
	const r = /^([a-z].+)\.js$/.exec(filename)

	return r && r[1]
}).filter(Boolean)

const longest = maxLength(loadables)

let firstResult = undefined, result = undefined		//	For catching possible benchmark code bugs.

const loadAndRun = (filename) => {
	const procedure = require(benchmarksDir + filename + '.js')

	procedure(small, 10) && procedure(small, 10)				//	Warm up the javascript optimizer

	const t0 = process.hrtime()

	result = procedure(array, SIZE)

	return Math.floor(usecsFrom(t0))
}

const cores = os.cpus()
print('Running Node.js %s on %i x %s\n', process.version, cores.length, cores[0].model)
print('OS: %s\n\n', os.version ? os.version() : os.platform())
print('%s : µsecs for processing %s of %i elements\n',
	'LOOP TYPE'.padEnd(longest), comment, SIZE)

for (const filename of loadables) {
	print('%s : %s\n',
		filename.replace(/_/g, ' ').padEnd(longest), (loadAndRun(filename) + '').padStart(8))
	if (firstResult === undefined) {
		firstResult = result
	} else if (result !== firstResult) {
		fatal('\tResults do not match - aborting due to benchmark error\n')
	}
}
