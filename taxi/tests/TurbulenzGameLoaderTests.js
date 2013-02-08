/*global module, equal, test*/
(function () {
	"use strict";
	module("Given turbulenz game loader");
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

	test("When mappingTableCreated called Then loadCompleteObserver called with requestHandler", function() {
		var expectedRequestHandler = "requestHandler",
			receivedRequestHandler = "",
			loadCompleteObserverMock = { notify : function(requestHandler) {  receivedRequestHandler = requestHandler; } },
			requestHandlerFactoryMock = { create : function() { return expectedRequestHandler; } },			
			loadCompletedStub = function() { },
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesStub = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryMock, turbulenzEngineStub, turbulenzServicesStub, loadCompleteObserverMock);

		turbulenzGame.load(loadCompletedStub);

		equal(receivedRequestHandler, expectedRequestHandler);
	});

	test("When mappingTableCreated Then loadCompleteObserver called with graphicsDevice", function() {
		var expectedGrapicsDevice = "graphicsDevice",
			receivedGraphicsDevice = "",
			loadCompleteObserverMock = { notify : function(requestHandler, graphicsDevice) {  receivedGraphicsDevice = graphicsDevice; } },
			loadCompletedStub = function() { },
			requestHandlerFactoryStub = { create : function() { } },						
			turbulenzEngineStub = { createGraphicsDevice : function() { return expectedGrapicsDevice; } },
			turbulenzServicesStub = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesStub, loadCompleteObserverMock);

		turbulenzGame.load(loadCompletedStub);

		equal(receivedGraphicsDevice, expectedGrapicsDevice);
	});

	test("When mappingTableCreated Then loadCompleteObserver called with mappingTable", function() {
		var expectedMappingTable = "mappingTable",
			receivedMappingTable = "",
			loadCompleteObserverMock = { notify : function(requestHandler, graphicsDevice, mappingTable) {  receivedMappingTable = mappingTable; } },
			loadCompletedStub = function() { },
			requestHandlerFactoryStub = { create : function() { } },						
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(expectedMappingTable); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesMock, loadCompleteObserverMock);

		turbulenzGame.load(loadCompletedStub);

		equal(receivedMappingTable, expectedMappingTable);
	});
}());