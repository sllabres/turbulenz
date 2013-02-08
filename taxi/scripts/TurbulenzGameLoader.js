function TurbulenzGameLoader(requestHandlerFactory, turbulenzEngine, turbulenzServices, loadCompleteObserver) {
	"use strict";
	var requestHandler = null,
		graphicsDevice = null;		

	function sessionCreated(gameSession) {
		turbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {
		// Three responsibilities here, use observer pattern and split out loading of objects
		if(loadCompleteObserver !== undefined) {
			loadCompleteObserver.notify(requestHandler, graphicsDevice, table);
		}
	}

	function load() {		
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