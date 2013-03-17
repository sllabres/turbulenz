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