'use strict'

SignatureServer = require '../src/SignatureServer'

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
