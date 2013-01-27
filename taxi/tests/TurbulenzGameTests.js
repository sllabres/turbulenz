/*global module, equal, test*/
(function () {
	"use strict";
	module("Given turbulenz game")
	test("When onload Then create RequestHandler with empty parameters", function() {
		var passedParameters = null,
			expectedPropertiesCount = 0,
			requestHandlerMock = { create : function(parameters) { passedParameters = parameters; } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzGame = new TurbulenzGame(requestHandlerMock, turbulenzEngineStub);

		turbulenzGame.load();

		ok(Object.keys(passedParameters).length === expectedPropertiesCount);
	});

	test("When onload Then create GrapihicsDevice with empty parameters", function() {
		var passedParameters = null,
			expectedPropertiesCount = 0,
			requestHandlerStub = { create : function() { } },
			turbulenzEngine = { createGraphicsDevice : function(parameters) { passedParameters = parameters; } },
			turbulenzGame = new TurbulenzGame(requestHandlerStub, turbulenzEngine);

		turbulenzGame.load();

		ok(Object.keys(passedParameters).length === expectedPropertiesCount);
	});
}());

function TurbulenzGame(requestHandlerFactory, turbulenzEngine) {
	"use strict";
	var requestHandler = {};

	function load() {
		requestHandler = requestHandlerFactory.create({});

		if(turbulenzEngine != null) {
			turbulenzEngine.createGraphicsDevice({});
		}
	}

	return { load : load };
}