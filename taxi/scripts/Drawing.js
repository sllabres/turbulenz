function Drawing(draw2D, drawCompleteNotifier) {
	"use strict";
	function draw(sprite) {
		draw2D.drawSprite(sprite);
		if(drawCompleteNotifier !== undefined) {
			drawCompleteNotifier.notify("drawSpriteComplete");
		}
	}

	return { draw : draw };
}