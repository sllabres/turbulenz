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
}());

function Drawing(graphicsDevice, draw2D) {
	"use strict";

	function draw() {
		if(graphicsDevice.beginFrame()) {
			draw2D.begin('alpha');			
			draw2D.clear([0.3]);			
		}
	}

	return { draw : draw };
}