function Game(drawService, screenDimensions) {
	var background = new Drawable(screenDimensions.height, screenDimensions.width, "Sky.jpg");

	function update() {
		drawingService.draw([0.3,0.3,0.3,1], [background]);
	}	

	return { update : update };
}