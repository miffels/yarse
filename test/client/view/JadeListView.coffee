'use strict'

Backbone = require 'backbone'

JadeView = require '../../../src/client/view/JadeView'
JadeListView = require '../../../src/client/view/JadeListView'

DataType = Backbone.Collection.extend {}
JadeListViewImplementation = JadeListView.extend({
	el: 'asd',
	templatePath: './template/dummy.jade',
	dataType: DataType
})

describe 'JadeListView', ->
	jadeListViewImplementation = null
	beforeEach ->
		jadeListViewImplementation = new JadeListViewImplementation {data: new DataType, lineType: JadeListView}
	
	it 'should not be be instantiable', ->
		(-> new JadeListView)
		.should.throw()
	it 'should initialize its attributes', ->
		jadeListViewImplementation.should.have.property 'data'
		jadeListViewImplementation.should.have.property 'dataType'
		jadeListViewImplementation.should.have.property 'lineType'
		jadeListViewImplementation.should.have.property 'addItem'
		jadeListViewImplementation.should.have.property 'clear'
	it.skip 'should detect when it is not passed a valid collection or item view', ->
		(-> new JadeListViewImplementation {data: new DataType})
		.should.throw()
		(-> new JadeListViewImplementation {lineType: new JadeListView})
		.should.throw()
