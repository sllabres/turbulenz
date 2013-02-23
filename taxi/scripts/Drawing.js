function Drawing(graphicsDevice, draw2D) {
	"use strict";
	var spriteLocal = null;

	function prepare(clearColour) {
		if(graphicsDevice.beginFrame()) {
			draw2D.begin('alpha');
			draw2D.clear(clearColour);			
			draw2D.setBackBuffer();
			drawSprite();
		}
	}

	function drawSprite() {
		draw2D.drawSprite(spriteLocal);
		complete();
	}

	function complete() {
		draw2D.end();		
		graphicsDevice.endFrame();		
	}

	function draw(clearColour, sprite) {
		spriteLocal = sprite;
		prepare(clearColour);		
	}

	return { draw : draw };
}