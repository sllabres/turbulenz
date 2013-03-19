function DrawingService(graphicsDevice, draw2D, spriteRepository) {
	"use strict";
	var drawing = draw2D.create({ graphicsDevice : graphicsDevice });
		drawing.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });		

	function prepare(clearColour, spriteNames) {
		if(graphicsDevice.beginFrame()) {
			drawing.begin('alpha');
			drawing.clear(clearColour);			
			drawing.setBackBuffer();
			drawSprites(spriteNames);
		}
	}

	function drawSprites(spriteNames) {
		for (var i = 0; i < spriteNames.length; i++) {
			drawing.drawSprite(spriteRepository.getBy(spriteNames[i]));
		}
		complete();
	}

	function complete() {
		drawing.end();		
		graphicsDevice.endFrame();		
	}

	function draw(clearColour, spriteNames) {		
		prepare(clearColour, spriteNames);		
	}

	return { draw : draw };
}