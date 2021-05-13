# javascript iterations benchmark

Comparing performance of different looping patterns.

## Usage

Just install the dependencies and type: `node .` or `yarn bench` or `npm run bench`.

The result will (hopefully) look something like:

```
Running Node.js v14.15.1 on 8 x Intel(R) Core(TM) i7-6820HQ CPU @ 2.70GHz
OS: Darwin Kernel Version 18.7.0: Mon Mar  8 22:11:48 PST 2021; root:xnu-4903.278.65~1/RELEASE_X86_64

LOOP TYPE      :    µsecs for 1M iterations
forEach        :    13881
for by index   :     2704
for of         :    29946
reduce         :    13485
while by index :     2696
while defined  :     2014
```


## Adding your own benchmarks

Just add your code module into benchmarks/ directory.

The module has to export a function receiving an array of integer values and an optional
size limit argument. The function has to return a bitwise xor of array elements.

In the report generated, the underscore characters in file names are changed to whitespaces.
