(function () {
	"use strict";
	module("Given sprite repository");
	test("When creating sprite repository Then subscribe to spriteLoaded event", function() {
		var subscribed = false,
			eventObserver = { subscribe : function() { subscribed = true; } },
			spriteRepository = new SpriteRepository(eventObserver);

		ok(subscribed);
	});

	// test("When calling getSpriteBy name Then sprite is returned", function() {
	// 	var expectedSprite = "expectedSprite",
	// 		eventObserver = { notify : function() { }, subscribe },
	// 		spriteRepository = new SpriteRepository(eventObserver);

	// 	listener.notify('spriteLoaded', { sprite : expectedSprite , name : "expectedSprite" } );

	// 	equal(returnedSprite, expectedSprite);
	// });
}());

function SpriteRepository(subscriber) {
	subscriber.subscribe();

}