 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {	
	TurbulenzEngine.onload = function onload() {
		//drawing = new Drawing(graphicsDevice, Draw2D),
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			mathDevice = TurbulenzEngine.createMathDevice({});

		turbulenzGame = new TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice);
		turbulenzGame.load(loadComplete);
	};

	function loadComplete() {
		console.log("loading complete.");
	}
}());

function TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice) {
	"use strict";
	var mappingTableLoader = new MappingTableService(requestHandler),
		loadingScreenService = new LoadingScreenService(graphicsDevice, mathDevice, requestHandler),
		loadCompleteCallback = null;

	function load(callback) {
		loadCompleteCallback = callback;	
		mappingTableLoader.load(mappingTableLoaded);
		loadingScreenService.show();
	}

	function mappingTableLoaded(table) {

	}

	return { load : load };
}

function SpriteLoaderService(graphicsDevice, requestHandler) {	
	var textureManager = TextureManager.create(graphicsDevice, requestHandler),
		spriteCollection = null;

	function load(table) {
		for(var key in table.urlMapping) {
			if(key.indexOf("textures") !== -1) {				
				textureLoader.load(urlMapping[key], textureLoadComplete);				
			}
		}
	}

	function textureLoadComplete(texture) {
		spriteCollection.push(Draw2DSprite.create( { texture: texture } ));
	}

	return { load : load };
}