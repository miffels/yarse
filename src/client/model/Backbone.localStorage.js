'use strict';

/**
 *	Backbone localStorage Adapter
 *	https://github.com/jeromegn/Backbone.localStorage
 *
 *	Adapted for node/webpack builds by Michael Jess
 *		- replaced this._ and this.Backbone with require statements
 *		- removed closure
 *		- module.exports now returns the LocalStorage constructor
 *		- use it traditionally (new Backbone.LocalStorage) or like this: localStorage: new require('path/to/Backbone.localStorage.js')('SomeCollection')
 *		- replaced global localStorage with _localStorage
 *		- _localStorage contains localStorage if it was defined before and {} otherwise
 */

// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

// Hold reference to Underscore.js and Backbone.js in the closure in order
// to make things work even if they are removed from the global namespace

/*global localStorage*/
var _localStorage = typeof localStorage === 'undefined' ? {getItem: function() {return null;}} : localStorage;

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

// Generate random hex digits

function S(factor) {
	return (((1+Math.random())*factor)|0).toString(16).substring(1);
}

// Generate 4 digits
function S4() {
	return S(0x10000);
}

// Generate 3 digits
function S3() {
	return S(0x1000);
}

// Generate 1 digit btwn 8 and B
function S1() {
	return ((((Math.random()*0x4) - 0x8/0x10)|0) + 0x8).toString(16);
}

// Generate RFC 4122 type 4 GUID
function guid() {
	return (S4()+S4()+'-'+S4()+'-4'+S3()+'-'+S1()+S3()+'-'+S4()+S4()+S4());
}

// Our Store is represented by a single JS object in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
// window.Store is deprectated, use Backbone.LocalStorage instead
function LocalStorage(name) {
	this.name = name;
	var store = this.localStorage().getItem(this.name);
	this.records = (store && store.split(',')) || [];
}

_.extend(LocalStorage.prototype, {

	// Save the current state of the **Store** to *localStorage*.
	save: function() {
		this.localStorage().setItem(this.name, this.records.join(','));
	},

	// Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
	// have an id of it's own.
	create: function(model) {
		if (!model.id) {
				model.id = guid();
				model.set(model.idAttribute, model.id);
		}
		this.localStorage().setItem(this.name+'-'+model.id, JSON.stringify(model));
		this.records.push(model.id.toString());
		this.save();
		return model.toJSON();
	},

	// Update a model by replacing its copy in `this.data`.
	update: function(model) {
		this.localStorage().setItem(this.name+'-'+model.id, JSON.stringify(model));
		if (!_.include(this.records, model.id.toString())) {
			this.records.push(model.id.toString()); this.save();
		}
		return model.toJSON();
	},

	// Retrieve a model from `this.data` by id.
	find: function(model) {
		return JSON.parse(this.localStorage().getItem(this.name+'-'+model.id));
	},

	// Return the array of all models currently in storage.
	findAll: function() {
		return _(this.records).chain()
				.map(function(id) {
					return JSON.parse(this.localStorage().getItem(this.name+'-'+id));
				}, this)
				.compact()
				.value();
	},

	// Delete a model from `this.data`, returning it.
	destroy: function(model) {
		this.localStorage().removeItem(this.name+'-'+model.id);
		this.records = _.reject(this.records, function(record_id) {
			return record_id === model.id.toString();
		});
		this.save();
		return model;
	},

	localStorage: function() {
		return _localStorage;
	}

});

// localSync delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
// window.Store.sync and Backbone.localSync is deprectated, use Backbone.LocalStorage.sync instead
LocalStorage.sync = Backbone.localSync = function(method, model, options, error) {
	var store = model.localStorage || model.collection.localStorage;

	// Backwards compatibility with Backbone <= 0.3.3
	if (typeof options === 'function') {
		options = {
			success: options,
			error: error
		};
	}

	var	response,
		syncDefined = $.Deferred && $.Deferred(); //If $ is having Deferred - use it.

	switch (method) {
		case 'read':
			response = model.id !== undefined ? store.find(model) : store.findAll();
			break;
		case 'create':
			response = store.create(model);
			break;
		case 'update':
			response = store.update(model);
			break;
		case 'delete':
			response = store.destroy(model);
			break;
	}

	if (response) {
		options.success(response);
		if (syncDefined) {
			syncDefined.resolve();
		}
	} else {
		options.error('Record not found');
		if (syncDefined) {
			syncDefined.reject();
		}
	}

	return syncDefined && syncDefined.promise();
};

Backbone.ajaxSync = Backbone.sync;

Backbone.getSyncMethod = function(model) {
	if(model.localStorage || (model.collection && model.collection.localStorage)) {
		return Backbone.LocalStorage.sync;
	}

	return Backbone.ajaxSync;
};

// Override 'Backbone.sync' to default to localSync,
// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
Backbone.sync = function(method, model, options, error) {
	return Backbone.getSyncMethod(model).apply(this, [method, model, options, error]);
};

Backbone.LocalStorage = LocalStorage;
module.exports = LocalStorage;