'use strict'

require '../../../src/client/util/String'

describe 'String', ->
  describe '#endsWith', ->
    string1 = ""
    string2 = "asd"

    it 'should return true if a string ends with a given substring', ->
      string1.endsWith("").should.equal true
      string2.endsWith("").should.equal true
      
      string1.endsWith("asd").should.equal false
      string2.endsWith("asd").should.equal true