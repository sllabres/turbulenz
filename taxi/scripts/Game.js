function Game(listener, mappingTableLoader, textureLoader, backgroundSpriteFactory, drawing) {
	"use strict";
	function load() {
		listener.subscribe('mappingTableLoaded', mappingTableLoaded);				
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