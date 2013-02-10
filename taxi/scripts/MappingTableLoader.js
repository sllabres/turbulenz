function MappingTableLoader(requestHandler, turbulenzServices, observer) {
	"use strict";	

	function sessionCreated(gameSession) {
		turbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {		
		observer.notify('mappingTableLoaded', table);
	}

	function load() {
		turbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	return { load : load };
}