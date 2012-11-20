'use strict';

var Cluster = require('./Cluster');

function Degradator() {}

Degradator.prototype.degradedRecipes = function(scores) {
	var clusters = this.classify(scores);
	var mali = this.calculateMali(clusters);
	this.degrade(scores, clusters, mali);
	return scores;
};

Degradator.prototype.classify = function(scores) {
	var clusters = {};
	
	scores.forEach(function(score, index) {
		var cluster = this.clusterFor(score, clusters);
		cluster.push(index);
	}.bind(this));
	
	return this.sort(clusters);
};

Degradator.prototype.clusterFor = function(score, clusters) {
	var cluster = clusters[score] || this.createCluster(score, clusters);
	return cluster;
};

Degradator.prototype.createCluster = function(score, clusters) {
	var cluster = new Cluster();
	cluster.clusterClass = score;
	clusters[score] = cluster;
	return cluster;
};

Degradator.prototype.sort = function(clusters) {
	var clustersAr = [];
	
	for(var clusterClass in clusters) {
		clustersAr.push(clusters[clusterClass]);
	}
	
	return clustersAr.reverse();
};

Degradator.prototype.calculateMali = function (clusters) {
	var mali = [];
	var malus = 0;
	
	clusters.forEach(function(cluster, index) {
		var minimum = cluster.score - cluster.length + 1;
		mali[index] = malus;
		malus += (cluster.length - 1);
		if(index < clusters.length - 1) {
			if(clusters[index+1].clusterClass < minimum) {
				malus = 0;
			}
		}
	});
	
	return mali;
};

Degradator.prototype.degrade = function(scores, clusters, mali) {
	mali.forEach(function(malus, index) {
		clusters[index].forEach(function(scoreIndex) {
			scores[scoreIndex] -= malus;
			malus++;
		});
	});
};

module.exports = Degradator;