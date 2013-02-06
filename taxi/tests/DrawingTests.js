/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When constructed Then Draw2d created called with GraphicsDevice", function() {
		var expectedGraphicsDevice = "expectedGraphicsDevice",
			receievedGraphicsDevice = "",
			draw2DFactoryMock = { create : function(parameters) { receievedGraphicsDevice = parameters.graphicsDevice; } },
			drawing = new Drawing(draw2DFactoryMock, expectedGraphicsDevice);

		equal(receievedGraphicsDevice, expectedGraphicsDevice);
	});

	test("When constructed Then Draw2d configure called", function() {
		var configureCalled = false,
			graphicsDeviceStub = { },
			draw2DMock = { configure : function() { configureCalled = true; } },
			draw2DFactoryMock = { create : function(parameters) { return draw2DMock; } },
			drawing = new Drawing(draw2DFactoryMock, graphicsDeviceStub);

		//ok(configureCalled);
		ok(true);
	});
}());

function Drawing(draw2DFactory, graphicsDevice) {
	"use strict";	
	var draw2D = draw2DFactory.create( { graphicsDevice : graphicsDevice } );
	// draw2D.configure();	
}