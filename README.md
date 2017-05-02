# readbuf
Read buffer in a blazing fast way! 7x faster than `Buffer`.

## Install

```js
npm install --save readbuf
```

## Example

All of the standard byte-reading methods of the Buffer interface are implemented and will operate across internal Buffer boundaries transparently.

```js
var readbuf = require('readbuf')
var buffer = new Buffer('abcdefghijklmnopqrstuvwxyz')

var reader = readbuf(buffer)
reader.readUInt8(3)
reader.slice(3)
reader.slice(3).readUInt8(0)
```

## Benchmark

```sh
node benchmark.js
```

Results:

```
Buffer#slice() x 5,623,308 ops/sec ±4.29% (81 runs sampled)
BufferReader#slice() x 33,198,783 ops/sec ±2.02% (88 runs sampled)
Fastest is BufferReader#slice()
Buffer#slice().slice() x 3,360,206 ops/sec ±0.66% (89 runs sampled)
BufferReader#slice().slice() x 20,635,719 ops/sec ±2.21% (85 runs sampled)
Fastest is BufferReader#slice().slice()
Buffer#slice().slice().slice() x 2,275,712 ops/sec ±1.00% (87 runs sampled)
BufferReader#slice().slice().slice() x 15,011,949 ops/sec ±1.21% (89 runs sampled)
Fastest is BufferReader#slice().slice().slice()
```
