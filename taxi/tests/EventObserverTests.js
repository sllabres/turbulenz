/*global module, equal, test*/
(function () {
	"use strict";
	module("Given event observer");
	test("When notified of event load Then subscriber notified", function() {
		var eventNotified = false,
			subscriber = { event : function() { eventNotified = true } },
			observer = new EventObserver();

			observer.subscribe('event', subscriber.event);

			observer.notify('event');

		ok(eventNotified);
	});

	test("When notified of event Then subcriber1 and subcriber2 notified", function() {
		var subscriber1Notified = false,
			subscriber2Notified = false,
			expectedEvent = 'event',
			subscriber1 = { event : function() { subscriber1Notified = true; } },
			subscriber2 = { event : function() { subscriber2Notified = true; } },
			observer = new EventObserver();
			
			observer.subscribe(expectedEvent, subscriber1.event);
			observer.subscribe(expectedEvent, subscriber2.event);

			observer.notify(expectedEvent);

		ok(subscriber1Notified);
		ok(subscriber2Notified);
	});

	test("When notified of event1 and multiple subscribers Then subcriber1 notified only", function() {
		var subscriber1Notified = false,
			subscriber2Notified = false,
			expectedEvent = 'event1',
			subscriber1 = { event : function() { subscriber1Notified = true; } },
			subscriber2 = { event : function() { subscriber2Notified = true; } },
			observer = new EventObserver();
			
			observer.subscribe(expectedEvent, subscriber1.event);
			observer.subscribe('event2', subscriber2.event);

			observer.notify(expectedEvent);

		ok(subscriber1Notified);
		ok(!subscriber2Notified);
	});
}());

function EventObserver() {
	var subscribers = [];

	function subscribe(type, subscriber) {
		if (subscribers[type] === undefined) {
            subscribers[type] = [];
        }

		subscribers[type].push(subscriber);
	}

	function notify(type) {
		for (var i = 0; i < subscribers[type].length; i++) {
			subscribers[type][i]();
		}
	}

	return { subscribe : subscribe,
			 notify : notify };
}