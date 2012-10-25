/**
 * Utility module that bridges the gap between node-jquery and regular client-side jquery.
 * It checks if jQuery was defined globally, which is the case in webpack exports,
 * and defines it accordingly if this is not the case.
 */

'use strict';
var $ = require('jquery');

/*global jQuery */
if(typeof jQuery !== 'undefined') {
	$ = jQuery;
}

module.exports = $;