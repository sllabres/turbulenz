function Game(renderer) {
	"use strict";
	function update() {
		renderer.draw();
	}	

	return { update : update };
}