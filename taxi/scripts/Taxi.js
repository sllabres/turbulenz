 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {	
	console.log("hello");
	TurbulenzEngine.onload = function onload() {
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			eventObserver = new EventObserver(),
			mathDevice = TurbulenzEngine.createMathDevice({}),
			drawing = new Drawing(graphicsDevice, Draw2D);

		eventObserver.subscribe('loadComplete', loadComplete);
		eventObserver.subscribe('spriteLoaded', spriteLoaded);

		turbulenzGame = new TurbulenzGameLoader(requestHandler, graphicsDevice, mathDevice, eventObserver);
		turbulenzGame.load(loadComplete);	

		function spriteLoaded(sprite) {
			//drawing.draw([0.3,0.3,0.3,1], [sprite.sprite]);		
		}
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
		spriteLoaderService = new SpriteLoaderService(graphicsDevice, requestHandler, listener);

	function load() {		
		mappingTableLoader.load(mappingTableLoaded);
		loadingScreenService.show();
	}

	function mappingTableLoaded(table) {
		spriteLoaderService.load(table.urlMapping);
	}

	return { load : load };
}

function SpriteLoaderService(graphicsDevice, requestHandler, listener) {	
	var textureManager = TextureManager.create(graphicsDevice, requestHandler),
		spriteCollection = [];

	function load(urlMapping) {
		for(var key in urlMapping) {
			if(key.indexOf("textures") !== -1) {				
				textureManager.load(urlMapping[key], false, textureLoadComplete);				
			}
		}
	}

	function textureLoadComplete(texture) {
		var sprite = Draw2DSprite.create({	origin: [0,0], 
											texture: texture,
											height: graphicsDevice.height,
											width: graphicsDevice.width });

		textureManager.add(texture.name, texture);		
		listener.notify('spriteLoaded', { sprite : sprite , name : getName(texture.name) } );
	}

	function getName(textureName) {
		var textureNameArray = textureName.split("/");		
		return textureNameArray[textureNameArray.length - 1];
	}

	return { load : load };
}