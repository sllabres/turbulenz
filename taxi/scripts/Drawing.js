function Drawing(observer, draw2D) {
	"use strict";
	observer.subscribe("drawingPrepareComplete", draw);

	function draw() {
		draw2D.drawSprite();
	}
}