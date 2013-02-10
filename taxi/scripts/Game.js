function Game(requestHandler, graphicsDevice, draw2DSprite, turbulenzServices) {
	"use strict";
	var mappingTableLoader = null,
		eventObserver = new EventObserver(),
		draw2D = null,
		textureLoader = null,
		mappingTable = null,
		backgroundSpriteFactory = null,
		drawing = null,
		sprite = null;

	function load() {
		eventObserver.subscribe('mappingTableLoaded', mappingTableLoaded);		
		mappingTableLoader = new MappingTableLoader(requestHandler, turbulenzServices, eventObserver);
		draw2D = Draw2D.create({ graphicsDevice : graphicsDevice });
		draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });
		backgroundSpriteFactory = new BackgroundSpriteFactory(draw2DSprite, graphicsDevice);
		drawing = new Drawing(graphicsDevice, draw2D, eventObserver);
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
		drawing.draw(sprite);
	}

	return { load : load };
}