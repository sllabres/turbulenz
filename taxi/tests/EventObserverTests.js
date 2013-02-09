/*global module, equal, test*/
(function () {
	"use strict";
	module("Given event observer");
	test("When notified of event load Then subscriber called", function() {
		var eventTriggered = false,
			subscriber = { event : function() { eventTriggered = true } },
			observer = new EventObserver();

			observer.subscribe('event', subscriber.event);

			observer.notify('event');

		ok(eventTriggered);
	});

	test("When notified of event Then subcriber1 and subcriber2 called", function() {
		var subscriber1Notified = false,
			subscriber2Notified = false,
			subscriber1 = { event : function() { subscriber1Notified = true; } },
			subscriber2 = { event : function() { subscriber2Notified = true; } },
			observer = new EventObserver();
			
			observer.subscribe('event', subscriber1.event);
			observer.subscribe('event', subscriber2.event);

			observer.notify('event');

		ok(subscriber1Notified);
		ok(subscriber2Notified);
	});
}());

function EventObserver() {
	var subscribers = [];

	function subscribe(eventType, subscriber) {
		subscribers.push(subscriber);
	}

	function notify(eventType) {
		for (var i = 0; i < subscribers.length; i++) {
			subscribers[i]();
		}
	}

	return { subscribe : subscribe,
			 notify : notify };
}