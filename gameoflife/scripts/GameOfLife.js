/*{{ javascript('jslib/camera.js') }}*/
 /*{{ javascript("jslib/htmlcontrols.js") }}*/
 /*{{ javascript('jslib/camera.js') }}*/
/*{{ javascript('jslib/floor.js') }}*/

/*jslint browser: true*/
/*global TurbulenzEngine*/
TurbulenzEngine.onload = function onload() {
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