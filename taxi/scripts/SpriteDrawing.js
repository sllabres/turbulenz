function SpriteDrawing(turbulenzEngine, draw2d) {
	"use strict";
	var graphicsDevice = turbulenzEngine.createGraphicsDevice({}),
		drawing = draw2d.create(graphicsDevice);

	function prepareDraw(clearColour) {
		drawing.setBackBuffer();
		drawing.clear(clearColour);
		drawing.begin('alpha');
	}

	function endDraw() {
		drawing.end();
		graphicsDevice.endFrame();
	}

	function draw(clearColour, sprite) {
		if (graphicsDevice.beginFrame()) {
			prepareDraw(clearColour);
			drawing.drawSprite(sprite);
			endDraw();
		}
	}

	return { draw : draw };
}