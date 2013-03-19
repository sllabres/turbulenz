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
		var expectedSprite = "expectedSprite",
			expectedSpriteName = "expectedSpriteName",
			callbackFunction = null,
			eventObserver = { subscribe : function(eventName, callback) { callbackFunction = callback; } },
			spriteRepository = new SpriteRepository(eventObserver),
			returnedSprite = "";

		callbackFunction(expectedSprite, expectedSpriteName);

		returnedSprite = spriteRepository.getBy(expectedSpriteName);

		equal(returnedSprite, expectedSprite);
	});
}());

function SpriteRepository(subscriber) {
	var sprites = [];

	function loaded(sprite, spriteName) {
		sprites[spriteName] = sprite;
	}

	function getBy(name) {
		return sprites[name];
	}

	return { getBy : getBy };
}