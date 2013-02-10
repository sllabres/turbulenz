function MappingTableLoader(requestHandler, turbulenzServices, loadCompleteObserver) {
	"use strict";	

	function sessionCreated(gameSession) {
		turbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {		
		loadCompleteObserver.notify('mappingTableLoaded', table);		
	}

	function load() {
		turbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	return { load : load };
}