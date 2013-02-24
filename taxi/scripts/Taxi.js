 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {	
	TurbulenzEngine.onload = function onload() {
		turbulenzGame = new TurbulenzGame();
		turbulenzGame.load();
	};	
}());

function TurbulenzGame() {
	var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			mathDevice = TurbulenzEngine.createMathDevice({}),
			drawing = new Drawing(graphicsDevice, Draw2D),
			mappingTableLoader = new MappingTableLoader(requestHandler),
			loadingScreenService = new LoadingScreenService(graphicsDevice, mathDevice, requestHandler);

	function load() {
		mappingTableLoader.load();
		loadingScreenService.show();
	}

	return { load : load };
}

function MappingTableLoader(requestHandler, listener) {
	"use strict";

	function sessionCreated(gameSession) {
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