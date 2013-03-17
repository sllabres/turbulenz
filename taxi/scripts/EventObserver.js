function EventObserver() {
	"use strict";
	var subscribers = [];

	function subscribe(type, subscriber) {
		if (subscribers[type] === undefined) {
            subscribers[type] = [];
        }

		subscribers[type].push(subscriber);
	}

	function notify(type, parameters) {
		for (var i = 0; i < subscribers[type].length; i++) {
			subscribers[type][i](parameters);
		}
	}

	return { subscribe : subscribe,
			 notify : notify };
}