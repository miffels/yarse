'use strict';

var InheritableArray = require('../util/InheritableArray');

function Cluster() {
	return InheritableArray.apply(this, arguments);
}

Cluster.prototype = new InheritableArray();
Cluster.prototype.constructor = Cluster;

Cluster.prototype.clusterClass = 0;

Cluster.prototype.compare = function(otherCluster) {
	return this.clusterClass - otherCluster.clusterClass;
};

module.exports = Cluster;