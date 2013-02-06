/*global module, equal, test*/
(function () {
	"use strict";
	module("Given background sprite factory");
	test("When create called Then Draw2DSprite.create called with origin [0,0]", function() {		
		var expectedOrigin = [0,0],
			receivedOrigin = null,
			draw2dSpriteFactoryMock = { create : function(parameters) { receivedOrigin = parameters.origin; } },
			backgroundSpriteFactory = new BackgroundSpriteFactory(draw2dSpriteFactoryMock);			

		backgroundSpriteFactory.create();

		equal(receivedOrigin[0], expectedOrigin[0]);
		equal(receivedOrigin[1], expectedOrigin[1]);
	});

	test("When create called with texture Then Draw2DSprite.create called with texture", function() {		
		var expectedExpectedTexture = "expectedTexture",
			receivedTexture = "",
			draw2dSpriteFactoryMock = { create : function(parameters) { receivedTexture = parameters.texture; } },
			backgroundSpriteFactory = new BackgroundSpriteFactory(draw2dSpriteFactoryMock);			

		backgroundSpriteFactory.create(expectedExpectedTexture);

		equal(receivedTexture, expectedExpectedTexture);
	});
}());

function BackgroundSpriteFactory(draw2DSpriteFactory) {

	function create(texture) {
		draw2DSpriteFactory.create({	origin: [0,0], 
										texture: texture });
	}

	return { create : create };	
}