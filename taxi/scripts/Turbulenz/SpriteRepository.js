function SpriteRepository(subscriber) {
	var sprites = [];

	function loaded(sprite) {
		console.log("sprite" + sprite.sprite);
		sprites[sprite.name] = sprite.sprite;
	}

	function getBy(name) {
		return sprites[name];
	}

	subscriber.subscribe("spriteLoaded", loaded);

	return { getBy : getBy };
}