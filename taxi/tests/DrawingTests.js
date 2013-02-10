/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When instantiated then subscribes to drawingPrepareComplete event type", function() {
		var expectedEventSubscribe = "drawingPrepareComplete",
			receivedEventSubscribe = "",			
			observerMock = { subscribe : function(type) { receivedEventSubscribe = type; } },
			drawingComplete = new Drawing(observerMock);		

		equal(receivedEventSubscribe, expectedEventSubscribe);
	});

	test("When drawingPrepareComplete event triggered then draw2D.drawSprite called", function() {
		var drawSpriteCalled = false,
			subscriberObject = null,
			draw2DMock = { drawSprite : function() { drawSpriteCalled = true; } },			
			observerMock = { subscribe : function(type, subscriber) { subscriberObject = subscriber; } },
			drawingComplete = new Drawing(observerMock, draw2DMock);

		subscriberObject();

		ok(drawSpriteCalled);
	});
}());