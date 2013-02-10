function DrawingComplete(observer, draw2D, graphicsDevice) {
	"use strict";	
	observer.subscribe("drawSpriteComplete", complete);	

	function complete() {
		draw2D.end();		
		graphicsDevice.endFrame();		
	}
}