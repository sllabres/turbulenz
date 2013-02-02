/*global module, equal, test*/
(function () {
	"use strict";
	module("Given turbulenz game loader")
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

	test("When game session created and createMappingTable called Then createMappingTable called with requestHandler ", function() {
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

	test("When game session created and createMappingTable called Then createMappingTable called with gameSession", function() {
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

	test("When mappingTableCreated Then loadComplete called with mappingTable", function() {
		var expectedMappingTable = "mappingTable",
			receivedMappingTable = "",
			loadCompletedMock = function(mappingTable) { receivedMappingTable = mappingTable; },
			requestHandlerFactoryStub = { create : function() { } },						
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(expectedMappingTable); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load(loadCompletedMock);

		equal(receivedMappingTable, expectedMappingTable);
	});

	test("When mappingTableCreated Then loadComplete called with graphicsDevice", function() {
		var expectedGrapicsDevice = "graphicsDevice",
			receivedGraphicsDevice = "",
			loadCompletedMock = function(mappingTable, graphicsDevice) { receivedGraphicsDevice = graphicsDevice; },
			requestHandlerFactoryStub = { create : function() { } },						
			turbulenzEngineStub = { createGraphicsDevice : function() { return expectedGrapicsDevice; } },
			turbulenzServicesStub = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesStub);

		turbulenzGame.load(loadCompletedMock);

		equal(receivedGraphicsDevice, expectedGrapicsDevice);
	});

	test("When mappingTableCreated called Then loadComplete called with requestHandler", function() {
		var expectedRequestHandler = "requestHandler",
			receivedRequestHandler = "",
			requestHandlerFactoryMock = { create : function() { return expectedRequestHandler; } },			
			loadCompletedMock = function(mappingTable, graphicsDevice, requestHandler) { receivedRequestHandler = requestHandler; },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesStub = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesStub);

		turbulenzGame.load(loadCompletedMock);

		equal(receivedRequestHandler, expectedRequestHandler);
	});	
}());

function TurbulenzGameLoader(requestHandlerFactory, turbulenzEngine, turbulenzServices) {
	"use strict";
	var requestHandler = null,
		graphicsDevice = null,
		loadCompleted = null;

	function sessionCreated(gameSession) {
		turbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {		
		loadCompleted(table, graphicsDevice, requestHandler);		
	}

	function load(gameLoadCompleted) {
		loadCompleted = gameLoadCompleted;
		requestHandler = requestHandlerFactory.create({});
		graphicsDevice = turbulenzEngine.createGraphicsDevice({});
		turbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	function unload() {
		requestHandler = null;
		graphicsDevice = null;		
	}

	return { load : load,
			 unload : unload };
}