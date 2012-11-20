'use strict'

Cluster = require '../../../src/client/numeric/Cluster'

describe 'Cluster', ->
	cluster = null;
	beforeEach ->
		cluster = new Cluster(1, 3)
		cluster.clusterClass = 0
	it 'should have the property clusterClass', ->
		cluster.should.have.property 'clusterClass'
		cluster.clusterClass.should.equal 0
	it 'should have the property length', ->
		cluster.should.have.property 'length'
		cluster.length.should.equal 2
	it 'should containt the items it is created with', ->
		cluster[0].should.equal 1
		cluster[1].should.equal 3