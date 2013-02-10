/*global module, equal, test*/
(function () {
	"use strict";
	module("Given turbulenz game loader");

	test("When load called Then call createGameSession with requestHandler", function() {
		var expectedRequestHandler = "requestHandler",
			receivedRequestHandler = "",
			graphicsDeviceStub = {},
			turbulenzServicesMock = { createGameSession : function(requestHandler) { receivedRequestHandler = requestHandler; } },
			turbulenzGame = new TurbulenzGameLoader(expectedRequestHandler, graphicsDeviceStub, turbulenzServicesMock);

		turbulenzGame.load();

		ok(expectedRequestHandler, receivedRequestHandler);
	});

	test("When game session created and createMappingTable called Then createMappingTable called with requestHandler ", function() {
		var expectedRequestHandler = "requestHandler",
			receivedRequestHandler = "",
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler) { receivedRequestHandler = requestHandler; } },
			turbulenzGame = new TurbulenzGameLoader(expectedRequestHandler, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		equal(receivedRequestHandler, expectedRequestHandler);
	});

	test("When game session created and createMappingTable called Then createMappingTable called with gameSession", function() {
		var expectedGameSession = "gameSession",
			receivedGameSession = "",
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(expectedGameSession); },
										createMappingTable : function(requestHandler, gameSession) { receivedGameSession = gameSession; } },
			turbulenzGame = new TurbulenzGameLoader({ }, turbulenzEngineStub, turbulenzServicesMock);

		turbulenzGame.load();

		equal(receivedGameSession, expectedGameSession);
	});

	test("When mappingTableCreated Then loadCompleteObserver called with mappingTable", function() {
		var expectedMappingTable = "mappingTable",
			receivedMappingTable = "",
			loadCompleteObserverMock = { notify : function(graphicsDevice, mappingTable) {  receivedMappingTable = mappingTable; } },
			loadCompletedStub = function() { },
			requestHandlerFactoryStub = { create : function() { } },						
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(expectedMappingTable); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesMock, loadCompleteObserverMock);

		turbulenzGame.load(loadCompletedStub);

		equal(receivedMappingTable, expectedMappingTable);
	});

	test("When mappingTableCreated Then loadCompleteObserver called with mappingTable event type 'mappingTableLoaded'", function() {
		var expectedMappingEventType = "mappingTableLoaded",
			mappingTableStub = "",
			receivedEventType = "",
			loadCompleteObserverMock = { notify : function(type, mappingTable) {  receivedEventType = type; } },
			loadCompletedStub = function() { },
			requestHandlerFactoryStub = { create : function() { } },						
			turbulenzEngineStub = { createGraphicsDevice : function() { } },
			turbulenzServicesMock = {	createGameSession : function(requestHandler, sessionCreated) { sessionCreated(); },
										createMappingTable : function(requestHandler, gameSession, mappingTableCreated) { mappingTableCreated(mappingTableStub); } },
			turbulenzGame = new TurbulenzGameLoader(requestHandlerFactoryStub, turbulenzEngineStub, turbulenzServicesMock, loadCompleteObserverMock);

		turbulenzGame.load(loadCompletedStub);

		equal(receivedEventType, expectedMappingEventType);
	});
}());