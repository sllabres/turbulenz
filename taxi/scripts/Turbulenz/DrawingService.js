function DrawingService(graphicsDevice, draw2D, spriteRepository) {
	"use strict";
	var drawing = draw2D.create({ graphicsDevice : graphicsDevice });
		drawing.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });		

	function prepare(clearColour, sprites) {
		if(graphicsDevice.beginFrame()) {
			drawing.begin('alpha');
			drawing.clear(clearColour);			
			drawing.setBackBuffer();
			drawSprites(sprites);
		}
	}

	function drawSprites(sprites) {
		for (var i = 0; i < sprites.length; i++) {
			var sprite = spriteRepository.getBy(sprites[i].name);
			sprite.setHeight(sprites[i].height);
			sprite.setWidth(sprites[i].width);
			drawing.drawSprite(sprite);
		}
		complete();
	}

	function complete() {
		drawing.end();		
		graphicsDevice.endFrame();		
	}

	function draw(clearColour, sprites) {		
		prepare(clearColour, sprites);		
	}

	return { draw : draw };
}