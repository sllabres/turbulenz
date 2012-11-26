function SpriteDrawing(draw2d, graphicsDevice, jquery) {
	"use strict";
	var drawing = draw2d.create({ graphicsDevice : graphicsDevice });

	function prepare() {
		if (graphicsDevice.beginFrame()) {
			drawing.setBackBuffer();
			drawing.clear([0.3,0.3,0.3,1]);
			jquery(this).trigger('drawPrepared', drawing);
		}
	}

	function draw(sprite) {
		if(sprite != undefined) {
			drawing.drawSprite(sprite);
		}
		jquery(this).trigger('drawComplete');		
	}

	function end() {
		if (graphicsDevice.beginFrame()) {
			drawing.end();
			graphicsDevice.endFrame();
			jquery(this).trigger('drawEnded');
		}
	}

	/*function draw(clearColour) {
		if (graphicsDevice.beginFrame()) {
			drawing.setBackBuffer();
			drawing.clear(clearColour);
			drawing.begin('alpha');
			jquery(this).trigger('draw', drawing);
			drawing.end();
			graphicsDevice.endFrame();
		}
	}*/

	return { draw : draw };
}