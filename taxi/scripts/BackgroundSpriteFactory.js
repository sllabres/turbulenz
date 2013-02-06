function BackgroundSpriteFactory(draw2DSpriteFactory, graphicsDevice) {
	"use strict";
	function create(texture) {
		return draw2DSpriteFactory.create({	origin: [0,0], 
										texture: texture,
										height: graphicsDevice.height,
										width: graphicsDevice.width });
	}

	return { create : create };	
}