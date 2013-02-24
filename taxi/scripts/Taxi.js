 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {	
	TurbulenzEngine.onload = function onload() {
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			mathDevice = TurbulenzEngine.createMathDevice({}),
			drawing = new Drawing(graphicsDevice, Draw2D),
			mappingTableLoader = new MappingTableLoader(requestHandler),
			loadingScreen = new LoadingScreenService(graphicsDevice, mathDevice, requestHandler);

		mappingTableLoader.load();
		loadingScreen.show();
	};	
}());

function MappingTableLoader(requestHandler, listener) {
	"use strict";

	function sessionCreate(gameSession) {
		TurbulenzServices.createMappingTable(requestHandler, gameSession, mappingTableCreated);
	}

	function mappingTableCreated(table) {		
		// listener.notify('mappingTableLoaded', table);
	}

	function load() {
		TurbulenzServices.createGameSession(requestHandler, sessionCreated);
	}

	return { load : load };
}