// $/index
'use strict'
const { maxLength, print, usecsFrom } = require('./utils')
const { readdirSync } = require('fs')
const { join, sep } = require('path')
const os = require('os')

const SIZE = 1000000

const array = [], small = []

for (let i = 0; i < SIZE; i += 1) {
	array.push(Math.floor(100 * Math.random()))
	if (i < 10) small.push(Math.floor(100 * Math.random()))
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
print('OS: %s\n\n', os.version())
print('LOOP TYPE'.padEnd(longest) + ' :    µsecs for 1M iterations\n')

for (const filename of loadables) {
	print('%s : %s\n',
		filename.replace(/_/g, ' ').padEnd(longest), (loadAndRun(filename) + '').padStart(8))
	if (firstResult === undefined) {
		firstResult = result
	} else if (result !== firstResult) {
		process.stderr.write('\tResults do not match - aborting due to benchmark error\n')
		process.exit(1)
	}
}
