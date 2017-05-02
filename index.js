class BufferReader {
  constructor(buffer, start, end) {
    this.buffer = buffer
    this.start  = start || 0
    this.end    = end   || buffer.length
    this.length = this.end - this.start
  }
  slice(start, end) {
    return new BufferReader(this, start, end)
  }
  toString(encoding='utf8', start=0, end=this.length) {
    return this.buffer.toString(
      encoding,
      this.start + start,
      this.start + end
    )
  }
}

var operations = [
  'readDoubleBE',
  'readDoubleLE',
  'readFloatBE',
  'readFloatLE',
  'readInt8',
  'readInt16BE',
  'readInt16LE',
  'readInt32BE',
  'readInt32LE',
  'readIntBE',
  'readIntLE',
  'readUInt8',
  'readUInt16BE',
  'readUInt16LE',
  'readUInt32BE',
  'readUInt32LE',
  'readUIntBE',
  'readUIntLE'
]

//BufferReader.prototype.readUInt8 = function(start, end) {
  //return this.buffer.readUInt8(this.start + start, end)
//}

for (var operation of operations) {
  var code = `
  BufferReader.prototype.${operation} = function(start, arg2, arg3) {
    return this.buffer.${operation}(this.start + start, arg2, arg3)
  }
  `
  eval(code)
}

module.exports = function readbuf(buffer, start, end) {
  return new BufferReader(buffer, start, end)
}
module.exports.operations = operations
