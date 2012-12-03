/*global module, equal, test*/
(function () {
	"use strict";
	module("Given game started");
	test("When created, Then createGraphicsDevice called with parameters", function() {
		var graphicsDeviceParametersReceived = {},
			TurbulenzEngine = { createGraphicsDevice : function(parameters) { graphicsDeviceParametersReceived = parameters } },
			Draw2D = { create : function() { } },
			game = new Game(TurbulenzEngine, Draw2D);

		ok(graphicsDeviceParametersReceived !== undefined);
	});

	test("When created, Then Draw2D created with graphics device", function() {
		var expectedGraphicsDevice = "graphicsDevice",
			graphicsDeviceReceived = "",
			TurbulenzEngine = { createGraphicsDevice : function() { return expectedGraphicsDevice; }, },
			Draw2D = { create : function(draw2DParameters) { graphicsDeviceReceived = draw2DParameters.graphicsDevice; } },
			game = new Game(TurbulenzEngine, Draw2D);

		equal(expectedGraphicsDevice, graphicsDeviceReceived);
	});
}());

function Game(TurbulenzEngine, Draw2D) {
	"use strict";
	var graphicsDevice = TurbulenzEngine.createGraphicsDevice({ }),
		Drawing2D = Draw2D.create( { graphicsDevice : graphicsDevice });	
}