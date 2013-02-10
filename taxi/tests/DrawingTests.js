/*global module, equal, test*/
(function () {
	"use strict";
	module("Given drawing");
	test("When instantiated then subscribes to drawingPrepareComplete event type", function() {
		var expectedEventSubscribe = "drawingPrepareComplete",
			receivedEventSubscribe = "",			
			observerMock = { subscribe : function(type) { receivedEventSubscribe = type; } },
			drawingComplete = new Drawing(observerMock);		

		equal(receivedEventSubscribe, expectedEventSubscribe);
	});
}());