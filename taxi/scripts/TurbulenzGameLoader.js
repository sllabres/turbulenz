function TurbulenzGameLoader(requestHandler, turbulenzEngine, turbulenzServices, loadCompleteObserver) {
	"use strict";
	var graphicsDevice = null;		

	function sessionCreated(gameSession) {
		turbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {
		// need to implement proper observer pattern and split out responsibilities (create request handler, graphics device, game session and mapping table)
		loadCompleteObserver.notify(graphicsDevice, table);		
	}

	function load() {
		graphicsDevice = turbulenzEngine.createGraphicsDevice({});
		turbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	return { load : load };
}