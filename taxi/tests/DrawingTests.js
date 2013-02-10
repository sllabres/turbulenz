/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When calling draw Then draw2D.drawSprite called", function() {
		var drawSpriteCalled = false,
			draw2DMock = { drawSprite : function() { drawSpriteCalled = true; } },
			drawing = new Drawing(draw2DMock);

		drawing.draw();

		ok(drawSpriteCalled);
	});

	test("When calling draw Then draw2D.drawSprite called with sprite", function() {
		var expectedSprite = "expectedSprite",
			receivedSprite = "",
			draw2DMock = { drawSprite : function(sprite) { receivedSprite = sprite; } },
			drawing = new Drawing(draw2DMock);

		drawing.draw(expectedSprite);

		equal(receivedSprite, expectedSprite);
	});
}());

//draw2D.drawSprite(background);

function Drawing(draw2D) {

	function draw(sprite) {
		draw2D.drawSprite(sprite);
	}

	return { draw : draw };
}