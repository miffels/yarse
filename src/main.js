'use strict';
var stuff = require("xmlhttprequest");

console.log(stuff);
console.log(stuff.XMLHttpRequest);
console.log(stuff.XMLHttpRequest.prototype);

var RemoteConfiguration = require('../src/remote');
var remoteConfiguration = new RemoteConfiguration();

console.log(remoteConfiguration.makeRequest());
