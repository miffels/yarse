'use strict';

function Constraint(leftHandSide, rightHandSide) {
	if(leftHandSide.length !== rightHandSide.length) {
		throw new Error('Left hand side and right hand side of constraint need to be of the same length.\nleft hand side: ' + JSON.stringify(leftHandSide) + '\nright hand side: ' + JSON.stringify(rightHandSide));
	}
	this.leftHandSide = leftHandSide;
	this.rightHandSide = rightHandSide;
}

module.exports = Constraint;