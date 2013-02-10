function DrawingPrepare(graphicsDevice, draw2D, observer) {
	"use strict";
	observer.subscribe("drawSpriteComplete", complete);	
	
	function prepare(clearColour) {
		if(graphicsDevice.beginFrame()) {
			draw2D.begin('alpha');
			draw2D.clear(clearColour);			
			draw2D.setBackBuffer();
			observer.notify("drawingPrepareComplete");			
		}
	}

	function complete() {
		draw2D.end();		
		graphicsDevice.endFrame();		
	}

	return { prepare : prepare };
}