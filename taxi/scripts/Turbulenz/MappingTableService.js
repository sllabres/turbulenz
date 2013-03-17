function MappingTableService(requestHandler) {
	"use strict";
	var tableLoadedCallback = null;

	function sessionCreated(gameSession) {
		TurbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {
		tableLoadedCallback(table);		
	}

	function load(callback) {
		tableLoadedCallback = callback;
		TurbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	return { load : load };
}