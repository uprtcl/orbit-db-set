
'use strict'

const Store = require('orbit-db-store')
const SetIndex = require('./SetIndex')
const { opcodes } = SetIndex

const type = 'set'

class SetStore extends Store {
  constructor (ipfs, id, dbname, options = {}) {
    if (!options.Index) Object.assign(options, { Index: SetIndex })
    super(ipfs, id, dbname, options)
    this._type = type
  }

  static get type () { return type }

  get size () { return this.index.size }
  get has () { return this.index.has.bind(this.index) }
  get keys () { return this.index.keys.bind(this.index) }
  get values () { return this.index.values.bind(this.index) }
  get entries () { return this.index.entries.bind(this.index) }
  get forEach () { return this.index.forEach.bind(this.index) }

  async add (value, { meta } = {}) {
    return this._addOperation({ op: opcodes.ADD, value, meta })
  }

  async delete (value, { meta } = {}) {
    return this._addOperation({ op: opcodes.DELETE, value, meta })
  }

  async clear ({ meta } = {}) {
    return this._addOperation({ op: opcodes.CLEAR, meta })
  }
}

module.exports = SetStore