/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When draw called Then graphicsDevice.BeginFrame called", function() {
		var beginFrameCalled = false,
			graphicsDeviceMock = { beginFrame : function() { beginFrameCalled = true; } },
			drawing = new Drawing(graphicsDeviceMock);

		drawing.draw();

		ok(beginFrameCalled);
	});
}());

function Drawing(graphicsDevice) {
	"use strict";
	function draw() {
		graphicsDevice.beginFrame();	
	}

	return { draw : draw };
}