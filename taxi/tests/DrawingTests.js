/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.begin called", function() {
		var draw2DBeginCalled = false,
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function() { draw2DBeginCalled = true; }, clear : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		ok(draw2DBeginCalled);
	});

	test("When draw called and graphicsDevice.BeginFrame returns false Then draw2D.begin NOT called", function() {
		var draw2DBeginCalled = false,
			graphicsDeviceStub = { beginFrame : function() { return false; } },
			draw2DMock = { begin : function() { draw2DBeginCalled = true; }, clear : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		ok(!draw2DBeginCalled);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.begin called with argument 'alpha'", function() {
		var expectedArgument = "alpha",
			receivedArgument = "",
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { receivedArgument = argument; }, clear : function() { } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		equal(receivedArgument, expectedArgument);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.clear called", function() {
		var draw2DClearCalled = false,			
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function() { draw2DClearCalled = true; } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		ok(draw2DClearCalled);
	});

	// 0.3,0.3,0.3,1
	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.clear called with red value of 0.3", function() {
		var expectedClearRedValue = 0.3,
			receievedClearRedValue = 0,
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { receievedClearRedValue = colour[0]; } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		equal(receievedClearRedValue, expectedClearRedValue);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.clear called with green value of 0.3", function() {
		var expectedClearGreenValue = 0.3,
			receievedClearGreenValue = 0,
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { receievedClearGreenValue = colour[1]; } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		equal(receievedClearGreenValue, expectedClearGreenValue);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.clear called with blue value of 0.3", function() {
		var expectedClearBlueValue = 0.3,
			receievedClearBlueValue = 0,
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { receievedClearBlueValue = colour[2]; } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		equal(receievedClearBlueValue, expectedClearBlueValue);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.clear called with alpha value of 1", function() {
		var expectedClearAlphaValue = 1,
			receievedClearAlphaValue = 0,
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { receievedClearAlphaValue = colour[3]; } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		equal(receievedClearAlphaValue, expectedClearAlphaValue);
	});

	test("When draw called with clearColour and graphicsDevice.BeginFrame returns true Then draw2D.clear called with passed in clearColour", function() {
		var expectedClearColour = [0.3,0.3,0.3,1],
			receievedClearClearColour = [],
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function(argument) { }, clear : function(colour) { receievedClearClearColour = colour; } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw(expectedClearColour);

		equal(receievedClearClearColour, expectedClearColour);
	});
}());

function Drawing(graphicsDevice, draw2D) {
	"use strict";

	function draw(clearColour) {
		if(graphicsDevice.beginFrame()) {
			draw2D.begin('alpha');
			if(clearColour === undefined) {
				draw2D.clear([0.3, 0.3, 0.3, 1]);
			} else {
				draw2D.clear(clearColour);
			}

		}
	}

	return { draw : draw };
}