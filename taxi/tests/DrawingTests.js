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
}());

//draw2D.drawSprite(background);

function Drawing(draw2D) { 

	function draw() {
		draw2D.drawSprite();
	}

	return { draw : draw };
}