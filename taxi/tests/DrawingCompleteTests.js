/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing complete");
	test("When instantiated then subscribes to drawSpriteComplete event type", function() {
		var expectedEventSubscribe = "drawSpriteComplete",
			receivedEventSubscribe = "",			
			observerMock = { subscribe : function(type) { receivedEventSubscribe = type; } },
			drawingComplete = new DrawingComplete(observerMock);		

		equal(receivedEventSubscribe, expectedEventSubscribe);
	});

	test("When drawSpriteComplete event triggered then draw2D.end called", function() {
		var endCalled = false,
			subscriberObject = null,
			draw2DMock = { end : function() { endCalled = true; } },
			graphiscDeviceStub = { endFrame : function() { } },
			observerMock = { subscribe : function(type, subscriber) { subscriberObject = subscriber; } },
			drawingComplete = new DrawingComplete(observerMock, draw2DMock, graphiscDeviceStub);
			
			subscriberObject();

		ok(endCalled);
	});

	test("When drawSpriteComplete event triggered then graphicsDevice.endFrame called", function() {
		var endFrameCalled = false,
			subscriberObject = null,
			draw2DStub = { end : function() { } },
			graphiscDeviceMock = { endFrame : function() { endFrameCalled = true; } },
			observerMock = { subscribe : function(type, subscriber) { subscriberObject = subscriber; } },
			drawingComplete = new DrawingComplete(observerMock, draw2DStub, graphiscDeviceMock);
			
			subscriberObject();

		ok(endFrameCalled);
	});
}());