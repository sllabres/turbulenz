function Drawing(draw2D, drawCompleteNotifier) {
	"use strict";
	function draw(sprite) {
		draw2D.drawSprite(sprite);
		drawCompleteNotifier.notify("drawSpriteComplete");
	}

	return { draw : draw };
}