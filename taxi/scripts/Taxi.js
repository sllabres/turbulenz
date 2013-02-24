 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {	
	TurbulenzEngine.onload = function onload() {
		turbulenzGame = new TurbulenzGame();
		turbulenzGame.load();
	};
}());

function TurbulenzGame() {
	"use strict";
	var requestHandler = RequestHandler.create({}),
		graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
		mathDevice = TurbulenzEngine.createMathDevice({}),		
		mappingTableLoader = new MappingTableService(requestHandler),
		loadingScreenService = new LoadingScreenService(graphicsDevice, mathDevice, requestHandler);

	function load() {
		mappingTableLoader.load();
		loadingScreenService.show();
	}

	function mappingTableLoaded(table) {

	}

	return { load : load };
}

function TextureLoaderService(textureManager, graphicsDevice, requestHandler) {	

	function load(table) {

	}

	return { load : load };
}