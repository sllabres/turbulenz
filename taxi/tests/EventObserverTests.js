/*global module, equal, test*/
(function () {
	"use strict";
	module("Given event observer");
	test("When notified of gameSession load Then subscriber gameSessionLoaded called", function() {
		var gameSessionLoadSubscriberCalled = false,
			subscriber = { gameSessionLoaded : function() { gameSessionLoadSubscriberCalled = true } },
			observer = new EventObserver();

			observer.subscribe('gameSessionLoaded', subscriber.gameSessionLoaded);

			observer.notify('gameSessionLoaded');

		ok(gameSessionLoadSubscriberCalled);
	});
}());

function EventObserver() {
	var subscribers;

	function subscribe(eventType, subscriber) {
		subscribers = subscriber;
	}

	function notify(eventType) {		
		subscribers();
	}

	return { subscribe : subscribe,
			 notify : notify };
}