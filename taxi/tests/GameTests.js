/*global module, equal, test*/
(function () {
	"use strict";
	module("Given game started");
	test("When created, Then createGraphicsDevice called with parameters", function() {
		var graphicsDeviceParametersReceived = {},
			TurbulenzEngine = { createGraphicsDevice : function(parameters) { graphicsDeviceParametersReceived = parameters } },
			game = new Game(TurbulenzEngine);

		ok(graphicsDeviceParametersReceived !== undefined);
	});	
}());

function Game(TurbulenzEngine) {
	"use strict";
	var graphicsDevice = TurbulenzEngine.createGraphicsDevice({ });
}