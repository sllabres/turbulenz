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

	test("When notified of event Then subcriber2 called", function() {
		var eventTriggered = false,
			subscriber1 = { event : function() { } },
			subscriber2 = { event : function() { eventTriggered = true; } },
			observer = new EventObserver();

			observer.subscribe('event', subscriber1.event);
			observer.subscribe('event', subscriber2.event);
			
			observer.notify('event');

		ok(eventTriggered);
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