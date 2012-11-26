function SpriteDrawing(draw2d, graphicsDevice) {
	"use strict";
	var drawing = draw2d.create({ graphicsDevice : graphicsDevice });

	function draw(clearColour, sprite) {
		if (graphicsDevice.beginFrame()) {			
			drawing.setBackBuffer();
			drawing.clear(clearColour);
			drawing.begin('alpha');
			drawing.drawSprite(sprite);
			drawing.end();
			graphicsDevice.endFrame();
		}
	}

	return { draw : draw };
}