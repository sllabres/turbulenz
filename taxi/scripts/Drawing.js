function Drawing(draw2D) {
	"use strict";
	function draw(sprite) {
		draw2D.drawSprite(sprite);
	}

	return { draw : draw };
}