function Rendering(draw2d, graphicsDevice, spriteRendering) {
	"use strict";
	var drawing = draw2d.create({ graphicsDevice : graphicsDevice });

	function draw(clearColour) {
		if (graphicsDevice.beginFrame()) {			
			drawing.setBackBuffer();
			drawing.clear(clearColour);
			drawing.begin('alpha');			

			if(spriteRendering != undefined) {
				spriteRendering.render();
			}

			drawing.end();
			graphicsDevice.endFrame();
		}
	}

	return { draw : draw };
}