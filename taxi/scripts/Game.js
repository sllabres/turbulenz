function Game(backgroundDrawing) {
	"use strict";
	function update() {
		backgroundDrawing.draw();
	}

	return { update : update };
}