function Drawing(draw2D, observer) {
	"use strict";
	function draw(sprite) {
		draw2D.drawSprite(sprite);
		observer.notify("drawSpriteComplete");
	}

	return { draw : draw };
}