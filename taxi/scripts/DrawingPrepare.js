function DrawingPrepare(graphicsDevice, draw2D, observer) {
	"use strict";
	function prepare(clearColour) {
		if(graphicsDevice.beginFrame()) {
			draw2D.begin('alpha');
			draw2D.clear(clearColour);			
			draw2D.setBackBuffer();
			observer.notify("drawingPrepareComplete");			
		}
	}

	return { prepare : prepare };
}