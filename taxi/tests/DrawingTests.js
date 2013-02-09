/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When draw called Then graphicsDevice.BeginFrame called", function() {
		var beginFrameCalled = false,
			graphicsDeviceMock = { beginFrame : function() { beginFrameCalled = true; } },
			draw2DStub = { begin : function() { } },
			drawing = new Drawing(graphicsDeviceMock, draw2DStub);

		drawing.draw();

		ok(beginFrameCalled);
	});

	test("When draw called and graphicsDevice.BeginFrame returns true Then draw2D.begin called", function() {
		var draw2DBeginCalled = false,
			graphicsDeviceStub = { beginFrame : function() { return true; } },
			draw2DMock = { begin : function() { draw2DBeginCalled = true; } },
			drawing = new Drawing(graphicsDeviceStub, draw2DMock);

		drawing.draw();

		ok(draw2DBeginCalled);
	});
}());

function Drawing(graphicsDevice, draw2D) {
	"use strict";

	function draw() {
		graphicsDevice.beginFrame();
		draw2D.begin();		
	}

	return { draw : draw };
}