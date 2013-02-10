function Game(requestHandlerFactory, turbulenzEngine) {
	"use strict";
	var requestHandler = null,
		graphicsDevice = null,
		mappingTableLoader = null,
		eventObserver = new EventObserver(),
		draw2D = null,
		textureLoader = new TextureLoader(),
		mappingTable = null;

	function load() {
		eventObserver.subscribe('mappingTableLoaded', mappingTableLoaded);
		requestHandler = requestHandlerFactory.create({});
		graphicsDevice = turbulenzEngine.createGraphicsDevice({});
		mappingTableLoader = new mappingTableLoader(requestHandler, graphicsDevice, eventObserver);
		draw2D = Draw2D.create({ graphicsDevice : graphicsDevice });
		draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });		
	}

	function mappingTableLoaded(table) {
		mappingTable = table;
		textureLoader.load(table.getURL("textures/Sky.jpg"), textureLoadComplete);
	}

	function textureLoadComplete(texture) {

	}

	return { load : load };
}