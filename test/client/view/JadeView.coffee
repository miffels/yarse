'use strict'

JadeView = require '../../../src/client/view/JadeView'
JadeViewImplementation = JadeView.extend({
	el: 'asd',
	templatePath: './template/dummy.jade'
})

describe 'JadeView', ->
	jadeViewImplementation = null
	beforeEach ->
		jadeViewImplementation = new JadeViewImplementation
	
	it 'should not be be instantiable', ->
	(-> new JadeView)
	.should.throw()
	it 'should initialize its attributes', ->
		jadeViewImplementation.should.have.property 'template'
		jadeViewImplementation.should.have.property 'templatePath'
		jadeViewImplementation.should.have.property 'jadeParameters'
		jadeViewImplementation.jadeParameters.should.eql {pretty: true}
		jadeViewImplementation.templatePath.should.equal './template/dummy.jade'
		jadeViewImplementation.template.should.be.ok
		jadeViewImplementation.html().should.equal ''