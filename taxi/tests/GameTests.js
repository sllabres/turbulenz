/*global module, equal, test*/
(function () {
	"use strict";
	module("Given game started");
	test("When created, Then createGraphicsDevice called", function() {
		var createGraphicsDeviceCalled = false,
			TurbulenzEngine = { createGraphicsDevice : function() { createGraphicsDeviceCalled = true } },
			game = new Game(TurbulenzEngine);

		ok(createGraphicsDeviceCalled);
	});
}());

function Game(TurbulenzEngine) {
	"use strict";
	var graphicsDevice = TurbulenzEngine.createGraphicsDevice();
}