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

}());

function Drawing(draw2DFactory, graphicsDevice) {
	"use strict";
	draw2DFactory.create( { graphicsDevice : graphicsDevice } );
}