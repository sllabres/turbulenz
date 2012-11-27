function Rendering(drawing2d, graphicsDevice, spriteRendering) {
	"use strict";

	function render(clearColour) {
		if (graphicsDevice.beginFrame()) {			
			drawing2d.setBackBuffer();
			drawing2d.clear(clearColour);
			drawing2d.begin('alpha');
			spriteRendering.render();
			drawing2d.end();
			graphicsDevice.endFrame();
		}
	}

	return { render : render };
}