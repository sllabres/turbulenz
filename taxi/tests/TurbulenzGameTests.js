/*global module, equal, test*/
(function () {
	"use strict";
	module("Given turbulenz game")
	test("When load called Then create RequestHandler with empty parameters", function() {
		var passedParameters = null,
			expectedPropertiesCount = 0,
			requestHandlerFactoryMock = { create : function(parameters) { passedParameters = parameters; } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesStub = { createGameSession : function() { } },
			turbulenzGame = new TurbulenzGame(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesStub);

		turbulenzGame.load();

		ok(Object.keys(passedParameters).length === expectedPropertiesCount);
	});

	test("When load called Then create GrapihicsDevice with empty parameters", function() {
		var passedParameters = null,
			expectedPropertiesCount = 0,
			requestHandlerFactoryStub = { create : function() { } },
			turbulenzEngineMock = { createGraphicsDevice : function(parameters) { passedParameters = parameters; } },
			turbulenzServicesStub = { createGameSession : function() { } },
			turbulenzGame = new TurbulenzGame(requestHandlerFactoryStub, turbulenzEngineMock, turbulenzServicesStub);

		turbulenzGame.load();

		ok(Object.keys(passedParameters).length === expectedPropertiesCount);
	});

	test("When load called Then call createGameSession", function() {
		var createGameSessionCalled = false,
			requestHandlerFactoryStub = { create : function() { } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = { createGameSession : function() { createGameSessionCalled = true; } },
			turbulenzGame = new TurbulenzGame(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		ok(createGameSessionCalled);
	});

	test("When load called Then call createGameSession with requestHandler", function() {
		var expectedRequestHandler = "requestHandler",
			passedRequestHandler = "",
			requestHandlerFactoryMock = { create : function() { return expectedRequestHandler; } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = { createGameSession : function(requestHandler) { passedRequestHandler = requestHandler; } },
			turbulenzGame = new TurbulenzGame(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		ok(expectedRequestHandler, passedRequestHandler);
	});
}());

function TurbulenzGame(requestHandlerFactory, turbulenzEngine, turbulenzServices) {
	"use strict";
	var requestHandler = null,
		graphicsDevice = null;

	function load() {
		requestHandler = requestHandlerFactory.create({});
		graphicsDevice = turbulenzEngine.createGraphicsDevice({});
		turbulenzServices.createGameSession(requestHandler);
	}

	return { load : load };
}