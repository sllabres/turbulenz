/*global module, equal, test*/
(function () {
	"use strict";
	module("Given background sprite factory");
	test("When create called Then Draw2DSprite.create called with origin [0,0]", function() {		
		var expectedOrigin = [0,0],
			receivedOrigin = null,
			graphicsDeviceStub = { height: 0 },
			draw2dSpriteFactoryMock = { create : function(parameters) { receivedOrigin = parameters.origin; } },
			backgroundSpriteFactory = new BackgroundSpriteFactory(draw2dSpriteFactoryMock, graphicsDeviceStub);			

		backgroundSpriteFactory.create();

		equal(receivedOrigin[0], expectedOrigin[0]);
		equal(receivedOrigin[1], expectedOrigin[1]);
	});

	test("When create called with texture Then Draw2DSprite.create called with texture", function() {		
		var expectedExpectedTexture = "expectedTexture",
			receivedTexture = "",
			graphicsDeviceStub = { height: 0 },
			draw2dSpriteFactoryMock = { create : function(parameters) { receivedTexture = parameters.texture; } },
			backgroundSpriteFactory = new BackgroundSpriteFactory(draw2dSpriteFactoryMock, graphicsDeviceStub);			

		backgroundSpriteFactory.create(expectedExpectedTexture);

		equal(receivedTexture, expectedExpectedTexture);
	});

	test("When create called Then Draw2DSprite.create called with screen height", function() {		
		var expectedExpectedHeight = 100,
			receivedHeight = 0,
			graphicsDeviceStub = { height: expectedExpectedHeight },
			draw2dSpriteFactoryMock = { create : function(parameters) { receivedHeight = parameters.height; } },
			backgroundSpriteFactory = new BackgroundSpriteFactory(draw2dSpriteFactoryMock, graphicsDeviceStub);			

		backgroundSpriteFactory.create();

		equal(receivedHeight, expectedExpectedHeight);
	});

	test("When create called Then Draw2DSprite.create called with screen height", function() {		
		var expectedExpectedHeight = 50,
			receivedHeight = 0,
			graphicsDeviceStub = { height: expectedExpectedHeight },
			draw2dSpriteFactoryMock = { create : function(parameters) { receivedHeight = parameters.height; } },
			backgroundSpriteFactory = new BackgroundSpriteFactory(draw2dSpriteFactoryMock, graphicsDeviceStub);			

		backgroundSpriteFactory.create();

		equal(receivedHeight, expectedExpectedHeight);
	});
}());

function BackgroundSpriteFactory(draw2DSpriteFactory, graphicsDevice) {

	function create(texture) {
		draw2DSpriteFactory.create({	origin: [0,0], 
										texture: texture,
										height: graphicsDevice.height });
	}

	return { create : create };	
}