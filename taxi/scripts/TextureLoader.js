function TextureLoader(textureManagerFactory, graphicsDevice, requestHandler) {
	"use strict";
	var textureManager = textureManagerFactory.create(graphicsDevice, requestHandler),
		loadComplete = null;

	function onload(texture) {		
		textureManager.add(texture.name, texture);		
		loadComplete(texture);		
	}

	function load(path, textureLoadComplete) {
		loadComplete = textureLoadComplete;
		textureManager.load(path, false, onload);
	}

	return { load : load };
}