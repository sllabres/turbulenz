function Game(requestHandler, graphicsDevice, draw2DSprite, turbulenzServices, textureManager, draw2D) {
	"use strict";
	var mappingTableLoader = null,
		eventObserver = new EventObserver(),
		textureLoader = null,
		mappingTable = null,
		backgroundSpriteFactory = null,
		drawing = null,
		sprite = null;

	function load() {
		eventObserver.subscribe('mappingTableLoaded', mappingTableLoaded);		
		mappingTableLoader = new MappingTableLoader(requestHandler, turbulenzServices, eventObserver);
		textureLoader = TextureLoader(textureManager, graphicsDevice, requestHandler);				
		backgroundSpriteFactory = new BackgroundSpriteFactory(draw2DSprite, graphicsDevice);
		drawing = new Drawing(graphicsDevice, draw2D, eventObserver);
		mappingTableLoader.load();
	}

	function mappingTableLoaded(table) {
		mappingTable = table;
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