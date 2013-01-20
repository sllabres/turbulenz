// anti corruption layer around turbulenz drawing api
function DrawAcl(graphicsDevice) {
	"use strict";
	var draw2D = Draw2D.create({ graphicsDevice : graphicsDevice }),    	
    	background;

    draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });    

    function draw() {
    	if (graphicsDevice.beginFrame()) {
			draw2D.setBackBuffer();
			draw2D.clear([0.3,0.3,0.3,1]);
			draw2D.begin('alpha');
			draw2D.drawSprite(background);
			draw2D.end();
			graphicsDevice.endFrame();
		}
    }    

    return { draw: draw };
}