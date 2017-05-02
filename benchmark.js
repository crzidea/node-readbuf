const readbuf = require('.')
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

function run(suite) {
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

const buffer = Buffer.from('abcdefghijklmnopqrstuvwxyz')
const reader = readbuf(buffer)

run(
  (new Benchmark.Suite)
  .add('Buffer#slice()', () => {
    const newBuffer = buffer.slice(3)
    const byte = newBuffer.readUInt8(1)
  })
  .add('BufferReader#slice()', () => {
    const newBuffer = reader.slice(3)
    const byte = newBuffer.readUInt8(1)
  })
)

run(
  (new Benchmark.Suite)
  .add('Buffer#slice().slice()', () => {
    const newBuffer = buffer.slice(3).slice(3)
    const byte = newBuffer.readUInt8(1)
  })
  .add('BufferReader#slice().slice()', () => {
    const newBuffer = reader.slice(3).slice(3)
    const byte = newBuffer.readUInt8(1)
  })
)

run(
  (new Benchmark.Suite)
  .add('Buffer#slice().slice().slice()', () => {
    const newBuffer = buffer.slice(3).slice(3).slice(3)
    const byte = newBuffer.readUInt8(1)
  })
  .add('BufferReader#slice().slice().slice()', () => {
    const newBuffer = reader.slice(3).slice(3).slice(3)
    const byte = newBuffer.readUInt8(1)
  })
)
