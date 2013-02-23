 /*jslint browser: true*/
/*global TurbulenzEngine,TurbulenzServices, RequestHandler*/
(function() {
	TurbulenzEngine.onload = function onload() { 				
		
		var requestHandler = RequestHandler.create({}),
			graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
			draw2D = Draw2D.create({ graphicsDevice : graphicsDevice }),			
			eventObserver = new EventObserver(),
			mappingTableLoader = new MappingTableLoader(requestHandler, TurbulenzServices, eventObserver),
			textureLoader = new TextureLoader(TextureManager, graphicsDevice, requestHandler),
			backgroundSpriteFactory = new BackgroundSpriteFactory(Draw2DSprite, graphicsDevice),
			drawing = new Drawing(graphicsDevice, draw2D);
		
		draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });		

		var game = new TurbulenzStarter(eventObserver, mappingTableLoader, textureLoader, backgroundSpriteFactory, drawing);

		game.load();
	};	
}());

function TurbulenzStarter(listener, mappingTableLoader, textureLoader, backgroundSpriteFactory, drawing) {
	"use strict";
	function load() {
		listener.subscribe('mappingTableLoaded', mappingTableLoaded);				
		mappingTableLoader.load();
	}

	function mappingTableLoaded(table) {		
		mappingTable = table;		

		for(var key in table.urlMapping) {
			console.log(key);
		}

		textureLoader.load(table.getURL("textures/Sky.jpg"), textureLoadComplete);
	}

	function textureLoadComplete(texture) {
		sprite = backgroundSpriteFactory.create(texture);
		TurbulenzEngine.setInterval(update, 1000 / 60);
	}

	function update() {
		drawing.draw([0.3,0.3,0.3,1], sprite);
	}

	return { load : load };
}