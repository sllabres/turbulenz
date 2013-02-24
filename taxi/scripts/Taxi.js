 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {	
	TurbulenzEngine.onload = function onload() {
		//drawing = new Drawing(graphicsDevice, Draw2D),
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			eventObserver = new EventObserver(),
			mathDevice = TurbulenzEngine.createMathDevice({});

		eventObserver.subscribe('loadComplete', loadComplete);

		turbulenzGame = new TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice, eventObserver);
		turbulenzGame.load(loadComplete);
	};

	function loadComplete() {
		//TurbulenzEngine.setInterval(starter.update, 1000 / 60);
		console.log("loading complete.");
	}
}());

function TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice, listener) {
	"use strict";
	var mappingTableLoader = new MappingTableService(requestHandler),
		loadingScreenService = new LoadingScreenService(graphicsDevice, mathDevice, requestHandler, listener),		
		spriteLoaderService = new SpriteLoaderService(graphicsDevice, requestHandler);

	function load() {		
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
		var sprite = Draw2DSprite.create( { texture : texture } );
		textureManager.add(texture.name, texture);
		spriteCollection.push( { sprite : sprite , name : texture.name } );		
	}

	return { load : load };
}