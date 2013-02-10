function Game(requestHandlerFactory, turbulenzEngine) {
	"use strict";
	var requestHandler = null,
		graphicsDevice = null;

	function load() {		
		requestHandler = requestHandlerFactory.create({});
		graphicsDevice = turbulenzEngine.createGraphicsDevice({});
	}

	return { load : load };
}