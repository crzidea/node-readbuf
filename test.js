const assert = require('assert')
const readbuf = require('.')

describe('readbuf', () => {
  const buffer = new Buffer('abcdefghijklmnopqrstuvwxyz')
  describe('readbuf(buffer)', () => {
    it('should counld be initialized', () => {
      const reader = readbuf(buffer)
    })
  })
  describe('operations', () => {
    const reader = readbuf(buffer)
    it('should be readed', () => {
      for (const operation of readbuf.operations) {
        const a = reader[operation](1)
        const b = buffer[operation](1)
        assert.strictEqual(a, b)
      }
    })
  })
  describe('#slice()', () => {
    let reader = readbuf(buffer)
    let offset = 0
    const step = 2
    it('should create new BufferReader with new offset', () => {
      reader = reader.slice(step)
      offset += step
    })
    it('should be readed', () => {
      const start = 2
      for (const operation of readbuf.operations) {
        const a = reader[operation](start)
        const b = buffer[operation](offset + start)
        assert.strictEqual(a, b)
      }
    })
    it('should create new BufferReader with new offset again', () => {
      reader = reader.slice(step)
      offset += step
    })
    it('should be readed', () => {
      const start = 3
      for (const operation of readbuf.operations) {
        const a = reader[operation](start)
        const b = buffer[operation](offset + start)
        assert.strictEqual(a, b)
      }
    })
  })
})
