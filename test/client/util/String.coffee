'use strict'

require '../../../src/client/util/String'

describe 'String', ->
	
	describe '#endsWith', ->
		it 'should return true if a string ends with a given substring', ->
			string1 = ""
			string2 = "asd"
			string1.endsWith("").should.equal true
			string2.endsWith("").should.equal true
			string1.endsWith("asd").should.equal false
			string2.endsWith("asd").should.equal true
			
	describe '#nominalize', ->
		it 'should capitalize the first letter of any given String', ->
			string1 = ""
			string2 = "asd"
			string1.nominalize().should.equal string1
			string2.nominalize().should.equal "Asd"
