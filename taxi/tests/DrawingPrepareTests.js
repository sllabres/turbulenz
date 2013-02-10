/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.begin called", function() {
		var draw2DBeginCalled = false,
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function() { draw2DBeginCalled = true; }, clear : function() { }, setBackBuffer : function() { } },
			drawing = new DrawingPrepare(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare();

		ok(draw2DBeginCalled);
	});

	test("When draw called and graphicsDevice.BeginFrame returns false Then draw2D.begin NOT called", function() {
		var draw2DBeginCalled = false,
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return false; } },
			draw2DMock = { begin : function() { draw2DBeginCalled = true; }, clear : function() { }, setBackBuffer : function() { } },
			drawing = new DrawingPrepare(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare();

		ok(!draw2DBeginCalled);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.begin called with argument 'alpha'", function() {
		var expectedArgument = "alpha",
			receivedArgument = "",
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { receivedArgument = argument; }, clear : function() { }, setBackBuffer : function() { } },
			drawing = new DrawingPrepare(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare();

		equal(receivedArgument, expectedArgument);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.clear called", function() {
		var draw2DClearCalled = false,
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function() { draw2DClearCalled = true; }, setBackBuffer : function() { } },
			drawing = new DrawingPrepare(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare();

		ok(draw2DClearCalled);
	});

	test("When draw called with clearColour and graphicsDevice.BeginFrame returns true Then draw2D.clear called with passed in clearColour", function() {
		var expectedClearColour = [0.3,0.3,0.3,1],
			receievedClearClearColour = [],
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { receievedClearClearColour = colour; }, setBackBuffer : function() { } },
			drawing = new DrawingPrepare(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare(expectedClearColour);

		equal(receievedClearClearColour, expectedClearColour);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.setBackBuffer called", function() {
		var setBackBufferCalled = false,
			drawingObserverStub = { subscribe : function(type) { }, notify : function(type) { } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { }, setBackBuffer : function() { setBackBufferCalled = true; } },
			drawing = new DrawingPrepare(graphicsDeviceStub, draw2DMock, drawingObserverStub);

		drawing.prepare({ });

		ok(setBackBufferCalled);
	});

	test("When draw called and drawing prepare complete Then drawingPrepareComplete notification sent", function() {
		var expectedNotification = "drawingPrepareComplete",
			receivedNotifcation = "",
			drawingObserverMock = { subscribe : function(type) { }, notify : function(type) { receivedNotifcation = type; } },
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { }, setBackBuffer : function() { } },
			drawing = new DrawingPrepare(graphicsDeviceStub, draw2DMock, drawingObserverMock);

		drawing.prepare({ });

		ok(receivedNotifcation, expectedNotification);
	});
}());