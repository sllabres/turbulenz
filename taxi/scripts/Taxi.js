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
		loadCompleteCallback = null,
		spriteLoaderService = new SpriteLoaderService(graphicsDevice, requestHandler);

	function load(callback) {
		loadCompleteCallback = callback;	
		mappingTableLoader.load(mappingTableLoaded);
		loadingScreenService.show();
	}

	function mappingTableLoaded(table) {
		spriteLoaderService.load(table.urlMapping);
	}

	return { load : load };
}

function SpriteLoaderService(graphicsDevice, requestHandler) {	
	var textureManager = TextureManager.create(graphicsDevice, requestHandler),
		spriteCollection = null;

	function load(urlMapping) {
		for(var key in urlMapping) {
			if(key.indexOf("textures") !== -1) {				
				textureManager.load(urlMapping[key], textureLoadComplete);				
			}
		}
	}

	function textureLoadComplete(texture) {
		textureManager.add(texture.name, texture);
		var sprite = Draw2DSprite.create( { texture : texture } );
		spriteCollection.push( { sprite : sprite , name : texture.name } );
	}

	return { load : load };
}