function TurbulenzGameLoader(requestHandler, turbulenzEngine, turbulenzServices, loadCompleteObserver) {
	"use strict";
	var graphicsDevice = null;		

	function sessionCreated(gameSession) {
		turbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {		
		loadCompleteObserver.notify('mappingTableLoaded', table);		
	}

	function load() {
		//graphicsDevice = turbulenzEngine.createGraphicsDevice({});
		turbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	return { load : load };
}