(function () {
	"use strict";
	module("Given sprite repository");
	test("When creating sprite repository Then subscribe to 'spriteLoaded' event", function() {
		var expectedSubcribeEventName = "spriteLoaded",
			subscribedEvent = "",
			eventObserver = { subscribe : function(eventName) { subscribedEvent = eventName; } },
			spriteRepository = new SpriteRepository(eventObserver);

		equal(subscribedEvent, expectedSubcribeEventName);
	});

	test("When calling getBy 'sprite' Then sprite is returned", function() {
		var expectedSprite = { sprite : "expectedSprite", name : "expectedSpriteName" },			
			callbackFunction = null,
			eventObserver = { subscribe : function(eventName, callback) { callbackFunction = callback; } },
			spriteRepository = new SpriteRepository(eventObserver),
			returnedSprite = "";

		callbackFunction(expectedSprite);

		returnedSprite = spriteRepository.getBy(expectedSprite.name);

		equal(returnedSprite, expectedSprite.sprite);
	});

	// test("When calling getBy 'differentSprite' Then differentSprite is returned", function() {
	// 	var expectedSprite = "expectedDifferentSprite",
	// 		expectedSpriteName = "expectedDifferentSpriteName",
	// 		callbackFunction = null,
	// 		eventObserver = { subscribe : function(eventName, callback) { callbackFunction = callback; } },
	// 		spriteRepository = new SpriteRepository(eventObserver),
	// 		returnedSprite = "";

	// 	callbackFunction(expectedSprite, expectedSpriteName);

	// 	returnedSprite = spriteRepository.getBy(expectedSpriteName);

	// 	equal(returnedSprite, expectedSprite);
	// });
}());