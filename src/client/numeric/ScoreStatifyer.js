'use strict';

function ScoreStatifyer() {}

ScoreStatifyer.prototype.statify = function(recipes) {
	var scores = [];
	recipes.each(function(recipe) {
		scores.push(recipe.score());
	});
	return scores;
};

module.exports = ScoreStatifyer;