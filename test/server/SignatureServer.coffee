'use strict'

SignatureServer = require '../../src/server/SignatureServer'

describe 'SignatureServer', ->
  signatureServer = null
  beforeEach ->
    signatureServer = new SignatureServer
  it 'should have a start method', ->
    signatureServer.should.have.property 'start'
  it 'should have a respond method', ->
    signatureServer.should.have.property 'respond'
  it 'should have a handleQuery method', ->
    signatureServer.should.have.property 'handleQuery'

  describe '#sign', ->
    it 'should sign correctly', ->
      signatureServer.contexts = {0: {}}
      signatureServer.contexts[0].query = {}
      signatureServer.contexts[0].query.data = 'bs'
      signatureServer.contexts[0].query.accessSecret = ''
      consumerSecret = 'cs'
      signatureServer.sign(consumerSecret, 0).should.equal 'egQqG5AJep5sJ7anhXju1unge2I%3D'
