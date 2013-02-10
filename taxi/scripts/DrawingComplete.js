function DrawingComplete(observer, draw2D, graphicsDevice) {
	"use strict";
	function setup() {
		observer.subscribe("drawSpriteComplete", complete);
	}

	function complete() {
		draw2D.end();		
		graphicsDevice.endFrame();		
	}

	return { setup : setup };
}