 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {	
	TurbulenzEngine.onload = function onload() {
		//drawing = new Drawing(graphicsDevice, Draw2D),
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			mathDevice = TurbulenzEngine.createMathDevice({});

		turbulenzGame = new TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice);
		turbulenzGame.load();
	};
}());

function TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice) {
	"use strict";
	var mappingTableLoader = new MappingTableService(requestHandler),
		loadingScreenService = new LoadingScreenService(graphicsDevice, mathDevice, requestHandler);

	function load() {
		mappingTableLoader.load(mappingTableLoaded);
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