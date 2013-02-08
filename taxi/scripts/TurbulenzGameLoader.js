function TurbulenzGameLoader(requestHandlerFactory, turbulenzEngine, turbulenzServices) {
	"use strict";
	var requestHandler = null,
		graphicsDevice = null,
		loadCompleted = null;

	function sessionCreated(gameSession) {
		turbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {
		// Three responsibilities here, use observer pattern and split out loading of objects
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