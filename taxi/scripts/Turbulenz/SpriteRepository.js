function SpriteRepository(subscriber) {
	var sprites = [];

	function loaded(sprite, spriteName) {
		sprites[spriteName] = sprite;
	}

	function getBy(name) {
		return sprites[name];
	}

	subscriber.subscribe("spriteLoaded", loaded);

	return { getBy : getBy };
}