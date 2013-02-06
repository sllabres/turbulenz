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
}());

function Drawing(draw2DFactory) {
	draw2DFactory.create();
}