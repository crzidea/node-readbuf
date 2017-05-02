var assert = require('assert')
var readbuf = require('.')

describe('readbuf', () => {
  var buffer = new Buffer('abcdefghijklmnopqrstuvwxyz')
  describe('readbuf(buffer)', () => {
    it('should counld be initialized', () => {
      var reader = readbuf(buffer)
    })
  })
  describe('operations', () => {
    var reader = readbuf(buffer)
    it('should be readed', () => {
      for (var operation of readbuf.operations) {
        var a = reader[operation](1)
        var b = buffer[operation](1)
        assert.strictEqual(a, b)
      }
    })
  })
  describe('#slice()', () => {
    var reader = readbuf(buffer)
    var offset = 0
    var step = 2
    it('should create new BufferReader with new offset', () => {
      reader = reader.slice(step)
      offset += step
    })
    it('should be readed', () => {
      var start = 2
      for (var operation of readbuf.operations) {
        var a = reader[operation](start)
        var b = buffer[operation](offset + start)
        assert.strictEqual(a, b)
      }
    })
    it('should create new BufferReader with new offset again', () => {
      reader = reader.slice(step)
      offset += step
    })
    it('should be readed', () => {
      var start = 3
      for (var operation of readbuf.operations) {
        var a = reader[operation](start)
        var b = buffer[operation](offset + start)
        assert.strictEqual(a, b)
      }
    })
  })
})
