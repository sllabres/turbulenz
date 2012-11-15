/*jslint browser: true*/
/*global TurbulenzEngine*/
TurbulenzEngine.onload = function onloadFn() {
    "use strict";
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({});

    function tick() {
        if (graphicsDevice.beginFrame()) {
            graphicsDevice.clear([0.0, 0.0, 0.0, 1.0], 1.0, 0.0);
            graphicsDevice.endFrame();
        }
    }

    TurbulenzEngine.setInterval(tick, 1000 / 60);
};