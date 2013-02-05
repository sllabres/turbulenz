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