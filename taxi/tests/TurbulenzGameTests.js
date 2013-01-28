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
			receivedRequestHandler = "",
			requestHandlerFactoryMock = { create : function() { return expectedRequestHandler; } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = { createGameSession : function(requestHandler) { receivedRequestHandler = requestHandler; } },
			turbulenzGame = new TurbulenzGame(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		ok(expectedRequestHandler, receivedRequestHandler);
	});

	test("When game session created Then createMappingTableCalled", function() {
		var createMappingTableCalled = false,
			requestHandlerFactoryStub = { create : function() { } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function() { createMappingTableCalled = true; } },
			turbulenzGame = new TurbulenzGame(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesMock);

			turbulenzGame.load();

		ok(createMappingTableCalled);
	});

	test("When game session created andd createMappingTable called Then createMappingTable called with requestHandler ", function() {
		var expectedRequestHandler = "requestHandler",
			receivedRequestHandler = "",
			requestHandlerFactoryMock = { create : function() { return expectedRequestHandler; } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler) { receivedRequestHandler = requestHandler; } },
			turbulenzGame = new TurbulenzGame(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		equal(receivedRequestHandler, expectedRequestHandler);
	});
}());

function TurbulenzGame(requestHandlerFactory, turbulenzEngine, turbulenzServices) {
	"use strict";
	var requestHandler = null,
		graphicsDevice = null;

	function sessionCreated() {
		turbulenzServices.createMappingTable(requestHandler);
	}

	function load() {
		requestHandler = requestHandlerFactory.create({});
		graphicsDevice = turbulenzEngine.createGraphicsDevice({});
		turbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	return { load : load };
}