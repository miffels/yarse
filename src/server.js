'use strict';

var SignatureServer = require('./server/SignatureServer');
var signatureServer = new SignatureServer();

signatureServer.start();