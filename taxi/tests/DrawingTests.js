/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing prepare");
	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.begin called", function() {
		var draw2DBeginCalled = false,
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function() { draw2DBeginCalled = true; }, clear : function() { }, setBackBuffer : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare();

		ok(draw2DBeginCalled);
	});

	test("When draw called and graphicsDevice.BeginFrame returns false Then draw2D.begin NOT called", function() {
		var draw2DBeginCalled = false,
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return false; } },
			draw2DMock = { begin : function() { draw2DBeginCalled = true; }, clear : function() { }, setBackBuffer : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare();

		ok(!draw2DBeginCalled);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.begin called with argument 'alpha'", function() {
		var expectedArgument = "alpha",
			receivedArgument = "",
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { receivedArgument = argument; }, clear : function() { }, setBackBuffer : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare();

		equal(receivedArgument, expectedArgument);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.clear called", function() {
		var draw2DClearCalled = false,
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function() { draw2DClearCalled = true; }, setBackBuffer : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare();

		ok(draw2DClearCalled);
	});

	test("When draw called with clearColour and graphicsDevice.BeginFrame returns true Then draw2D.clear called with passed in clearColour", function() {
		var expectedClearColour = [0.3,0.3,0.3,1],
			receievedClearClearColour = [],
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { receievedClearClearColour = colour; }, setBackBuffer : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare(expectedClearColour);

		equal(receievedClearClearColour, expectedClearColour);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.setBackBuffer called", function() {
		var setBackBufferCalled = false,
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { }, setBackBuffer : function() { setBackBufferCalled = true; } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare({ });

		ok(setBackBufferCalled);
	});

	test("When draw called and drawing prepare complete Then drawingPrepareComplete notification sent", function() {
		var expectedNotification = "drawingPrepareComplete",
			receivedNotifcation = "",
			drawingObserverMock = { subscribe : function(type) { }, notify : function(type) { receivedNotifcation = type; } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { }, setBackBuffer : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock, drawingObserverMock);

		drawing.prepare({ });

		ok(receivedNotifcation, expectedNotification);
	});

	module("Given drawing complete");
	test("When instantiated then subscribes to drawSpriteComplete event type", function() {
		var expectedEventSubscribe = "drawSpriteComplete",
			receivedEventSubscribe = "",	
			draw2DStub = { end : function() { } },		
			graphiscDeviceStub = { endFrame : function() { } },
			observerMock = { subscribe : function(type) { if(type == "drawSpriteComplete") { receivedEventSubscribe = type; } } },
			drawingComplete = new Drawing(graphiscDeviceStub, draw2DStub, observerMock);		

		equal(receivedEventSubscribe, expectedEventSubscribe);
	});

	test("When drawSpriteComplete event triggered then draw2D.end called", function() {
		var endCalled = false,
			subscriberObject = null,
			draw2DMock = { end : function() { endCalled = true; } },
			graphiscDeviceStub = { endFrame : function() { } },
			observerMock = { subscribe : function(type, subscriber) { if(type == "drawSpriteComplete") { subscriberObject = subscriber; } } },
			drawingComplete = new Drawing(graphiscDeviceStub, draw2DMock, observerMock);
			
			subscriberObject();

		ok(endCalled);
	});

	test("When drawSpriteComplete event triggered then graphicsDevice.endFrame called", function() {
		var endFrameCalled = false,
			subscriberObject = null,
			draw2DStub = { end : function() { } },
			graphiscDeviceMock = { endFrame : function() { endFrameCalled = true; } },
			observerMock = { subscribe : function(type, subscriber) { if(type == "drawSpriteComplete") { subscriberObject = subscriber; } } },
			drawingComplete = new Drawing(graphiscDeviceMock, draw2DStub, observerMock);
			
			subscriberObject();

		ok(endFrameCalled);
	});

	module("Given drawing");
	test("When instantiated then subscribes to drawingPrepareComplete event type", function() {
		var expectedEventSubscribe = "drawingPrepareComplete",
			receivedEventSubscribe = "",			
			observerMock = { subscribe : function(type) { if(type == "drawingPrepareComplete") { receivedEventSubscribe = type; } } },
			drawingComplete = new Drawing({ }, { }, observerMock);		

		equal(receivedEventSubscribe, expectedEventSubscribe);
	});

	test("When drawingPrepareComplete event triggered then draw2D.drawSprite called", function() {
		var drawSpriteCalled = false,
			subscriberObject = null,
			draw2DMock = { drawSprite : function() { drawSpriteCalled = true; } },			
			observerMock = { subscribe : function(type, subscriber) { if(type == "drawingPrepareComplete") { subscriberObject = subscriber; } }, notify : function(type) { } },
			drawingComplete = new Drawing({ }, draw2DMock, observerMock);

		subscriberObject();

		ok(drawSpriteCalled);
	});

	test("When draw complete Then drawSpriteComplete notification sent", function() {		
		var expectedNotification = "drawSpriteComplete",
			receivedNotification = "",
			drawObject = null,
			draw2DMock = { drawSprite : function() { } },			
			observerMock = { subscribe : function(type, subscriber) { if(type == "drawingPrepareComplete") { drawObject = subscriber; } }, notify : function(type) { receivedNotification = type; } },
			drawingComplete = new Drawing({ }, draw2DMock, observerMock);

		drawObject();

		equal(receivedNotification, expectedNotification);
	});
}());