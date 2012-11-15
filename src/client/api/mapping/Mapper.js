'use strict';

function Mapper() {}

Mapper.prototype.mapArray = function(array, attributeMap) {
	if(!array) {
		return [];
	}
	if(!attributeMap) {
		return array instanceof Array ? array : [array];
	}
	return array instanceof Array ? this.mapAll(array, attributeMap)
		: [this.map(array, attributeMap)];
};

Mapper.prototype.mapAll = function(remoteEntities, attributeMap) {
	var localEntities = [];
	for(var index in remoteEntities) {
		var remoteEntity = remoteEntities[index];
		localEntities.push(this.map(remoteEntity, attributeMap));
	}
	return localEntities;
};

Mapper.prototype.map = function(remoteEntity, attributeMap) {
	var localEntityAttributes = {};
	for(var remoteAttributeName in attributeMap) {
		var localAttributeName = attributeMap[remoteAttributeName];
		var value =  this.resolvePath(remoteEntity, remoteAttributeName);
		if(value) {
			if(localAttributeName === null && Object.keys(attributeMap).length === 1) {
				return value;
			}
			localEntityAttributes[localAttributeName] = value;
		}
	}
	return localEntityAttributes;
};

Mapper.prototype.resolvePath = function(object, attributePath) {
	function get(object, attribute) {
		return object ? object[attribute] || null : null;
	}
	return attributePath.split('.').reduce(get, object);
};

module.exports = Mapper;