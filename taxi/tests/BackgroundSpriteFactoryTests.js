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
}());

function BackgroundSpriteFactory(draw2DSpriteFactory) {

	function create() {
		draw2DSpriteFactory.create();
	}

	return { create : create };	
}