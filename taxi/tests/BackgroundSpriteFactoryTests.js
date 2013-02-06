/*global module, equal, test*/
(function () {
	"use strict";
	module("Given background sprite factory");
	test("When create called Then Draw2DSprite.create called", function() {		
		var draw2dSpriteCreatedCalled = false,
			draw2dSpriteFactoryMock = { create : function() { draw2dSpriteCreatedCalled = true; } },
			backgroundSpriteFactory = new BackgroundSpriteFactory(draw2dSpriteFactoryMock);			

		backgroundSpriteFactory.create();

		ok(draw2dSpriteCreatedCalled);
	});

	test("When create called Then Draw2DSprite.create called with origin [0,0]", function() {		
		var expectedOrigin = [0,0],
			receivedOrigin = null,
			draw2dSpriteFactoryMock = { create : function(parameters) { receivedOrigin = parameters.origin; } },
			backgroundSpriteFactory = new BackgroundSpriteFactory(draw2dSpriteFactoryMock);			

		backgroundSpriteFactory.create();

		equal(receivedOrigin[0], expectedOrigin[0]);
		equal(receivedOrigin[1], expectedOrigin[1]);
	});
}());

function BackgroundSpriteFactory(draw2DSpriteFactory) {

	function create() {
		draw2DSpriteFactory.create({ origin: [0,0] });
	}

	return { create : create };	
}