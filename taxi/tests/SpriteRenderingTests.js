/*global module, equal, test, ok, SpriteRendering */
(function () {
	"use strict";
	module("Sprite Rendering");
	test("Calling render, calls drawing2d drawSprite", function () {
		var drawSpriteCalled = false,
			drawing2d = { drawSprite : function () { drawSpriteCalled = true; } },
			spriteRendering = new SpriteRendering(drawing2d);

		spriteRendering.render();

		ok(drawSpriteCalled);
	});

	test("Callined render, calls drawSprite with added sprite", function () {
		var expectedSprite = "sprite",
			spritePassed,
			drawing2d = { drawSprite : function (sprite) { spritePassed = sprite; } },
			spriteRendering = new SpriteRendering(drawing2d);

		spriteRendering.addSprite(expectedSprite);
		spriteRendering.render();

		equal(expectedSprite, spritePassed);
	});
}());

function SpriteRendering(drawing2d) {
	"use strict";
	var spriteCollection;

	function render() {
		drawing2d.drawSprite(spriteCollection);
	}

	function addSprite(sprite) {
		spriteCollection = sprite;
	}

	return { render : render,
		addSprite : addSprite };
}