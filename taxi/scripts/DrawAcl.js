// anti corruption layer around turbulenz drawing api
function DrawAcl() {
	"use strict";
	var graphicsDevice = TurbulenzEngine.createGraphicsDevice({}),
    	draw2D = Draw2D.create({ graphicsDevice : graphicsDevice }),
    	background;

    draw2D.configure({ viewportRectangle : [0, 0, graphicsDevice.width, graphicsDevice.height], scaleMode : 'scale' });    

    function draw() {
    	if (graphicsDevice.beginFrame()) {
			draw2D.setBackBuffer();
			draw2D.clear(clearColour);
			draw2D.begin('alpha');
			drawing2d.drawSprite(background);
			draw2D.end();
			graphicsDevice.endFrame();
		}
    }

    function sessionCreated(gameSession) {
			TurbulenzServices.createMappingTable(requestHandler,
				gameSession,
				function (table) {
					graphicsDevice.createTexture({ src : table.getURL("textures/Sky.jpg"),
						mipmaps : true,						
						onload : function (texture) {
							background = Draw2DSprite.create({
							origin: [0,0],
							texture : texture,
							height : graphicsDevice.height,
							width : graphicsDevice.width
							});							
						}
					});
				});
		}

    return { draw: draw,
    		 sessionCreated : sessionCreated };
}