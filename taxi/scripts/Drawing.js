function Drawing(graphicsDevice, draw2D) {
	"use strict";
	var sprites = [],
		drawing = draw2D.create({ graphicsDevice : graphicsDevice });
		drawing.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });		

	function prepare(clearColour) {
		if(graphicsDevice.beginFrame()) {
			drawing.begin('alpha');
			drawing.clear(clearColour);			
			draw2D.setBackBuffer();
			drawSprite();
		}
	}

	function drawSprite() {
		for(var sprite in sprites) {
			drawing.drawSprite(sprite);
		}
		complete();
	}

	function complete() {
		drawing.end();		
		graphicsDevice.endFrame();		
	}

	function draw(clearColour, spriteCollection) {
		sprites = spriteCollection;
		prepare(clearColour);		
	}

	return { draw : draw };
}