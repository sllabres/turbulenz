function SpriteLoaderService(graphicsDevice, requestHandler, listener) {	
	var textureManager = TextureManager.create(graphicsDevice, requestHandler),
		spriteCollection = [];

	function load(urlMapping) {
		for(var key in urlMapping) {
			if(key.indexOf("textures") !== -1) {	
				console.log("load called");			
				textureManager.load(urlMapping[key], false, textureLoadComplete);				
			}
		}
	}

	function textureLoadComplete(texture) {
		var sprite = Draw2DSprite.create({	origin: [0,0], 
											texture: texture });

		// height: graphicsDevice.height,
		// width: graphicsDevice.width

		textureManager.add(texture.name, texture);		
		listener.notify('spriteLoaded', { sprite : sprite , name : getName(texture.name) } );
	}

	function getName(textureName) {
		var textureNameArray = textureName.split("/");		
		return textureNameArray[textureNameArray.length - 1];
	}

	return { load : load };
}