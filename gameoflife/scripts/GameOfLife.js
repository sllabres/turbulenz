/*jslint browser: true*/
/*global TurbulenzEngine*/
TurbulenzEngine.onload = function onload() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
    	canvas = TurbulenzEngine.canvas;


    function update() {
    }

    TurbulenzEngine.onunload = function gameOnunload() {
	};

    TurbulenzEngine.setInterval(update, 1000 / 60);
};