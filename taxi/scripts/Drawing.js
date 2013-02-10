function Drawing(graphicsDevice, draw2D, observer) {
	"use strict";
	var spriteLocal = null;

	observer.subscribe("drawingPrepareComplete", drawSprite);
	observer.subscribe("drawSpriteComplete", complete);

	function prepare(clearColour) {
		if(graphicsDevice.beginFrame()) {
			draw2D.begin('alpha');
			draw2D.clear(clearColour);			
			draw2D.setBackBuffer();
			observer.notify("drawingPrepareComplete");			
		}
	}

	function drawSprite() {
		draw2D.drawSprite(spriteLocal);
		observer.notify("drawSpriteComplete");		
	}

	function complete() {
		draw2D.end();		
		graphicsDevice.endFrame();		
	}

	function draw(clearColour, sprite) {
		prepare(clearColour);
		spriteLocal = sprite;
	}

	return { draw : draw };
}