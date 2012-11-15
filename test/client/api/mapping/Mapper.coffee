'use strict'

Mapper = require '../../../../src/client/api/mapping/Mapper'

describe 'Mapper', ->
  mapper = null;
  remoteObject1 = {remote_id: '1'}
  remoteObject2 = {remote_id: '2'}
  remoteObject3 = {a: {b: {c: {d: '1'}}}}
  attributeMap = {'remote_id': 'id'}
  attributePathMap = {'a.b.c.d': 'id'}
  localObject1 = {id: '1'}
  localObject2 = {id: '2'}
  remoteObjectArray = [remoteObject1, remoteObject2]
  localObjectArray = [localObject1, localObject2]
  string = "ws"
  stringArray = ["ws", "da"];
  beforeEach ->
    mapper = new Mapper
  
  describe '#map', ->
    it 'should map the attributes of a remote entity to a local object', ->
      mapper.map(remoteObject1, attributeMap).should.eql localObject1
      
    it 'should be able to handle attribute paths', ->
      mapper.map(remoteObject3, attributePathMap).should.eql localObject1
  
  describe '#mapAll', ->
    it 'should map the attributes of several remote entities to local objects', ->
      mapper.mapArray(remoteObjectArray, attributeMap).should.eql localObjectArray
  
  describe '#mapAsArray', ->
    it 'should abstract the mapping issues with arrays, i.e. it may be undefined or any object (crappy API)', ->
      mapper.mapAsArray(null, null).should.eql []
      mapper.mapAsArray(remoteObject1, attributeMap).should.eql [localObject1]
      mapper.mapAsArray(remoteObjectArray, attributeMap).should.eql localObjectArray
    it 'should be able to convert objects if no attribute map is present, just by turning them into arrays', ->
      mapper.mapAsArray(string, null).should.eql [string]
      mapper.mapAsArray(stringArray, null).should.eql stringArray