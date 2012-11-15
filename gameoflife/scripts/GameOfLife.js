/*{{ javascript('jslib/camera.js') }}*/
 /*{{ javascript("scripts/htmlcontrols.js") }}*/
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

    // Controls
    var htmlControls = HTMLControls.create();
    htmlControls.addCheckboxControl({
        id: "checkbox01"
    });
    htmlControls.register();

    TurbulenzEngine.setInterval(tick, 1000 / 60);
};