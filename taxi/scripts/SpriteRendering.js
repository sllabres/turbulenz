function SpriteRendering(drawing2d) {
	"use strict";
	var spriteCollection = [];

	function render() {
		for (var spriteCount = 0, arrayLength = spriteCollection.length; spriteCount < arrayLength; spriteCount++) {
			drawing2d.drawSprite(spriteCollection[spriteCount]);
		}

		spriteCollection = [];
	}

	function addSprite(sprite) {
		spriteCollection.push(sprite);
	}

	return { render : render,
		addSprite : addSprite };
}