/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing complete");
	test("When instantiating then subscribes to drawSpriteComplete event type", function() {
		var expectedEventSubscribe = "drawSpriteComplete",
			receivedEventSubscribe = "",			
			observerMock = { subscribe : function(type) { receivedEventSubscribe = type; } },
			drawing = new DrawingComplete(observerMock);

		equal(receivedEventSubscribe, expectedEventSubscribe);
	});
}());

function DrawingComplete(observer) {
	observer.subscribe("drawSpriteComplete");
}