function DrawingPrepare(graphicsDevice, draw2D, observer) {
	"use strict";		
	observer.subscribe("drawingPrepareComplete", draw);
	observer.subscribe("drawSpriteComplete", complete);

	function prepare(clearColour) {
		if(graphicsDevice.beginFrame()) {
			draw2D.begin('alpha');
			draw2D.clear(clearColour);			
			draw2D.setBackBuffer();
			observer.notify("drawingPrepareComplete");			
		}
	}

	function draw() {
		draw2D.drawSprite();
		if(observer.notify !== undefined) {
			observer.notify("drawSpriteComplete");
		}
	}

	function complete() {
		draw2D.end();		
		graphicsDevice.endFrame();		
	}

	return { prepare : prepare };
}