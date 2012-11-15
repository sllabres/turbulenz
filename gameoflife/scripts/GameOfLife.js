/*jslint browser: true*/
/*global TurbulenzEngine*/
TurbulenzEngine.onload = function onloadFn() {
    "use strict";
    var gd = TurbulenzEngine.createGraphicsDevice({});

    function tick() {
        if (gd.beginFrame()) {
            gd.clear([0.0, 0.0, 0.0, 1.0], 1.0, 0.0);
            gd.endFrame();
        }
    }

    TurbulenzEngine.setInterval(tick, 1000 / 60);
};