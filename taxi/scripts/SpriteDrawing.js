function SpriteDrawing(draw2d, graphicsDevice, jquery) {
	"use strict";
	var drawing = draw2d.create({ graphicsDevice : graphicsDevice });

	function draw(clearColour) {
		if (graphicsDevice.beginFrame()) {
			drawing.setBackBuffer();
			drawing.clear(clearColour);
			drawing.begin('alpha');
			
			/*if(jquery != undefined) {
				jquery(this).trigger('draw');
			}*/

			drawing.end();
			graphicsDevice.endFrame();
		}
	}

	return { draw : draw };
}