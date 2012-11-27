/*global module, equal, test, ok, SpriteRendering */
(function () {
	"use strict";
	module("Sprite Rendering");
	test("When calling render with no sprites added, does NOT call drawSprite", function () {
		var drawSpriteCalled = false,
			drawing2d = { drawSprite : function () { drawSpriteCalled = true; } },
			spriteRendering = new SpriteRendering(drawing2d);

		spriteRendering.render();

		equal(drawSpriteCalled, false);
	});

	test("When calling render, calls drawSprite with added sprite", function () {
		var expectedSprite = "sprite",
			spritePassed,
			drawing2d = { drawSprite : function (sprite) { spritePassed = sprite; } },
			spriteRendering = new SpriteRendering(drawing2d);

		spriteRendering.addSprite(expectedSprite);
		spriteRendering.render();

		equal(expectedSprite, spritePassed);
	});

	test("When calling render with two sprites added, calls drawSprite twice", function () {
		var drawSpriteCallCount = 0,
			drawing2dMock = { drawSprite : function () { drawSpriteCallCount += 1; } },
			spriteRendering = new SpriteRendering(drawing2dMock);

		spriteRendering.addSprite("Sprite1");
		spriteRendering.addSprite("Sprite2");
		spriteRendering.render();

		equal(drawSpriteCallCount, 2);
	});

	test("When calling render with two sprites added, calls drawSprite with Sprite1", function () {
		var drawSpriteCalledWithSprite = false,
			expectedSprite = "Sprite1",
			drawing2dMock = { drawSprite : function (sprite) { if(sprite == expectedSprite) { drawSpriteCalledWithSprite = true; } } },
			spriteRendering = new SpriteRendering(drawing2dMock);

		spriteRendering.addSprite(expectedSprite);
		spriteRendering.addSprite("Sprite2");
		spriteRendering.render();

		ok(drawSpriteCalledWithSprite);
	});

	test("When calling render with two sprites added, calls drawSprite with Sprite2", function () {
		var drawSpriteCalledWithSprite = false,
			expectedSprite = "Sprite2",
			drawing2dMock = { drawSprite : function (sprite) { if(sprite == expectedSprite) { drawSpriteCalledWithSprite = true; } } },
			spriteRendering = new SpriteRendering(drawing2dMock);

		spriteRendering.addSprite("Sprite1");
		spriteRendering.addSprite(expectedSprite);
		spriteRendering.render();

		ok(drawSpriteCalledWithSprite);
	});

	test("When calling render twice without adding sprites, drawSprite not called on second render", function () {
		var drawSpriteCallCount = 0,
			drawing2dMock = { drawSprite : function () { drawSpriteCallCount += 1; } },
			spriteRendering = new SpriteRendering(drawing2dMock);

		spriteRendering.addSprite("Sprite1");
		spriteRendering.render();
		spriteRendering.render();

		equal(drawSpriteCallCount, 1);
	});
}());