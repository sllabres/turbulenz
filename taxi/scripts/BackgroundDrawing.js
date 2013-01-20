function BackgroundDrawing(drawAcl) {
	"use strict";
	function draw() {
		drawAcl.draw("Sky");
	}

	return { draw : draw };
}