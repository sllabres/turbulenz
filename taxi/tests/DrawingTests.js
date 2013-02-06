/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When constructed Then Draw2d created called", function() {
		var draw2dCreateCalled = false,
			draw2dMock = { create : function() { draw2dCreateCalled } },
			drawing = new Drawing(draw2dMock);			

		ok(draw2dCreateCalled);
	});
}());