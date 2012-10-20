'use strict';
var RemoteConfiguration = require('../src/remote');

var remoteConfiguration = new RemoteConfiguration();

remoteConfiguration.parameters.method = 'profile.create';

remoteConfiguration.makeRequest(function(request) {
	console.log(request);
});