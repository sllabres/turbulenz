/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When calling draw Then draw2D.drawSprite called", function() {
		var drawSpriteCalled = false,
			draw2DMock = { drawSprite : function() { drawSpriteCalled = true; } },
			notifierStub = { notify : function() { } },
			drawing = new Drawing(draw2DMock, notifierStub);

		drawing.draw();

		ok(drawSpriteCalled);
	});

	test("When calling draw Then draw2D.drawSprite called with sprite", function() {
		var expectedSprite = "expectedSprite",
			receivedSprite = "",
			draw2DMock = { drawSprite : function(sprite) { receivedSprite = sprite; } },
			notifierStub = { notify : function() { } },
			drawing = new Drawing(draw2DMock, notifierStub);

		drawing.draw(expectedSprite);

		equal(receivedSprite, expectedSprite);
	});

	test("When calling draw Then drawComplete event type notification sent", function() {
		var expectedNotification = "drawSpriteComplete",
			receivedNotification = "",
			draw2DStub = { drawSprite : function() { } },
			notifierMock = { notify : function(type) { receivedNotification = type; } },
			drawing = new Drawing(draw2DStub, notifierMock);

		drawing.draw("");

		equal(receivedNotification, expectedNotification);
	});
}());