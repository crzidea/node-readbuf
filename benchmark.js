#!/usr/bin/env node
var readbuf = require('.')
var Benchmark = require('benchmark')
var suite = new Benchmark.Suite

console.log('Benchmark results:');

function run(suite) {
  console.log('--------');
  suite
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .on('error', function(event) {
    console.error(event.target.error.stack);
  })
  .run()
}

var buffer = Buffer.from('abcdefghijklmnopqrstuvwxyz')
var reader = readbuf(buffer)

run(
  (new Benchmark.Suite)
  .add('Buffer#slice()', () => {
    var newBuffer = buffer.slice(3)
    var byte = newBuffer.readUInt8(1)
  })
  .add('BufferReader#slice()', () => {
    var newBuffer = reader.slice(3)
    var byte = newBuffer.readUInt8(1)
  })
)

run(
  (new Benchmark.Suite)
  .add('Buffer#slice().slice()', () => {
    var newBuffer = buffer.slice(3).slice(3)
    var byte = newBuffer.readUInt8(1)
  })
  .add('BufferReader#slice().slice()', () => {
    var newBuffer = reader.slice(3).slice(3)
    var byte = newBuffer.readUInt8(1)
  })
)

run(
  (new Benchmark.Suite)
  .add('Buffer#slice().slice().slice()', () => {
    var newBuffer = buffer.slice(3).slice(3).slice(3)
    var byte = newBuffer.readUInt8(1)
  })
  .add('BufferReader#slice().slice().slice()', () => {
    var newBuffer = reader.slice(3).slice(3).slice(3)
    var byte = newBuffer.readUInt8(1)
  })
)
