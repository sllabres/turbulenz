function SpriteDrawing(draw2d, graphicsDevice, jquery) {
	"use strict";
	var drawing = draw2d.create({ graphicsDevice : graphicsDevice });

	//drawing.drawSprite(sprite);

	function draw(clearColour) {
		if (graphicsDevice.beginFrame()) {
			drawing.setBackBuffer();
			drawing.clear(clearColour);
			drawing.begin('alpha');
			jquery(this).trigger('draw', drawing);
			drawing.end();
			graphicsDevice.endFrame();
		}
	}

	return { draw : draw };
}