/*global module, equal, test*/
(function () {
	"use strict";
	module("Given event observer");
	test("When notified of event load Then subscriber notified", function() {
		var eventNotified = false,
			subscribedEvent = 'event',
			subscriber = { event : function() { eventNotified = true } },
			observer = new EventObserver();

			observer.subscribe(subscribedEvent, subscriber.event);

			observer.notify(subscribedEvent);

		ok(eventNotified);
	});

	test("When notified of event Then subcriber1 and subcriber2 notified", function() {
		var subscriber1Notified = false,
			subscriber2Notified = false,
			subscribedEvent = 'event',
			subscriber1 = { event : function() { subscriber1Notified = true; } },
			subscriber2 = { event : function() { subscriber2Notified = true; } },
			observer = new EventObserver();
			
			observer.subscribe(subscribedEvent, subscriber1.event);
			observer.subscribe(subscribedEvent, subscriber2.event);

			observer.notify(subscribedEvent);

		ok(subscriber1Notified);
		ok(subscriber2Notified);
	});

	test("When notified of event1 and multiple subscribers Then subcriber1 notified only", function() {
		var subscriber1Notified = false,
			subscriber2Notified = false,
			subscribedEvent = 'event1',
			subscriber1 = { event : function() { subscriber1Notified = true; } },
			subscriber2 = { event : function() { subscriber2Notified = true; } },
			observer = new EventObserver();
			
			observer.subscribe(subscribedEvent, subscriber1.event);
			observer.subscribe('event2', subscriber2.event);

			observer.notify(subscribedEvent);

		ok(subscriber1Notified);
		ok(!subscriber2Notified);
	});
}());