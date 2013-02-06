/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When constructed Then Draw2d created called", function() {
		var draw2dCreateCalled = false,
			draw2DFactoryMock = { create : function() { draw2dCreateCalled = true; } },
			drawing = new Drawing(draw2DFactoryMock);

		ok(draw2dCreateCalled);
	});

	test("When constructed Then Draw2d created called with GraphicsDevice", function() {
		var expectedGraphicsDevice = "expectedGraphicsDevice",
			receievedGraphicsDevice = "",
			draw2DFactoryMock = { create : function(parameters) { receievedGraphicsDevice = parameters.graphicsDevice; } },
			drawing = new Drawing(draw2DFactoryMock, expectedGraphicsDevice);

		equal(receievedGraphicsDevice, expectedGraphicsDevice);
	});

}());

function Drawing(draw2DFactory, graphicsDevice) {
	draw2DFactory.create( { graphicsDevice : graphicsDevice } );
}