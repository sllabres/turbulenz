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
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesStub);

		turbulenzGame.load();

		ok(Object.keys(passedParameters).length === expectedPropertiesCount);
	});

	test("When load called Then create GrapihicsDevice with empty parameters", function() {
		var passedParameters = null,
			expectedPropertiesCount = 0,
			requestHandlerFactoryStub = { create : function() { } },
			turbulenzEngineMock = { createGraphicsDevice : function(parameters) { passedParameters = parameters; } },
			turbulenzServicesStub = { createGameSession : function() { } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryStub, turbulenzEngineMock, turbulenzServicesStub);

		turbulenzGame.load();

		ok(Object.keys(passedParameters).length === expectedPropertiesCount);
	});

	test("When load called Then call createGameSession with requestHandler", function() {
		var expectedRequestHandler = "requestHandler",
			receivedRequestHandler = "",
			requestHandlerFactoryMock = { create : function() { return expectedRequestHandler; } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = { createGameSession : function(requestHandler) { receivedRequestHandler = requestHandler; } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		ok(expectedRequestHandler, receivedRequestHandler);
	});

	test("When game session created andd createMappingTable called Then createMappingTable called with requestHandler ", function() {
		var expectedRequestHandler = "requestHandler",
			receivedRequestHandler = "",
			requestHandlerFactoryMock = { create : function() { return expectedRequestHandler; } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler) { receivedRequestHandler = requestHandler; } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		equal(receivedRequestHandler, expectedRequestHandler);
	});

	test("When game session created andd createMappingTable called Then createMappingTable called with gameSession", function() {
		var expectedGameSession = "gameSession",
			receivedGameSession = "",
			requestHandlerFactoryMock = { create : function() { } },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(expectedGameSession); },
										createMappingTable : function(requestHandler, gameSession) { receivedGameSession = gameSession; } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		equal(receivedGameSession, expectedGameSession);
	});

	test("When mappingTableCreated Then textureLoading load called", function() {
		var textureLoaderLoadCalled = false,		
			requestHandlerFactoryStub = { create : function() { } },			
			textureLoaderMock = { load : function() { textureLoaderLoadCalled = true; } },			
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesStub = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesStub, textureLoaderMock);

		turbulenzGame.load();

		ok(textureLoaderLoadCalled);
	});
}());

function TurbulenzGameLoader(requestHandlerFactory, turbulenzEngine, turbulenzServices, textureLoader) {
	"use strict";
	var requestHandler = null,
		graphicsDevice = null;

	function sessionCreated(gameSession) {
		turbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {
		if(textureLoader != null) {
			textureLoader.load();
		}
	}

	function load() {
		requestHandler = requestHandlerFactory.create({});
		graphicsDevice = turbulenzEngine.createGraphicsDevice({});
		turbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	return { load : load };
}