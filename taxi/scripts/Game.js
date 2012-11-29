function Game(renderer) {
	"use strict";	
	var backgroundColour = [0.3,0.3,0.3,1];

	function update() {
		renderer.draw(backgroundColour, null);
	}	

	return { update : update };
}