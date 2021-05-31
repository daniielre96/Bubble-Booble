// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/TileSet.png");

	// Loading spritesheets
	var bub = new Texture("imgs/bub.png");
	var bubble = new Texture("imgs/bubble.png");
	var robotraged = new Texture("imgs/EnemiesSelected.png")

	// Prepare Bub sprite & its animations
	this.bubSprite = new Sprite(224, 224, 32, 32, 7, bub);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_STAND_LEFT, [0, 0, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_STAND_RIGHT, [32, 0, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_WALK_LEFT, [0, 0, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_LEFT, [0, 32, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_LEFT, [0, 64, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT, [32, 0, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT, [32, 32, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT, [32, 64, 32, 32]);

	/*this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [0, 0, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 96, 64, 128]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [0, 32, 32, 64]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 96, 64, 128]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [0, 64, 32, 96]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 96, 64, 128]);*/

	this.bubSprite.setAnimation(BUB_STAND_RIGHT);



	// Prepare bubble sprite & its animation
	this.bubbleSprite = new Sprite(400, 160, 32, 32, 3, bubble);

	this.bubbleSprite.addAnimation();
	this.bubbleSprite.addKeyframe(0, [0, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [16, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [32, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [48, 0, 16, 16]);


	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level1);

	// Store current time
	this.currentTime = 0
}

function Scene(level){

		// Loading texture to use in a TileMap
		var tilesheet = new Texture("imgs/TileSet.png");

		this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level);

		this.player = new Player(224, 240, this.map);

		this.bubble = new Bubble(360, 112);
		this.bubbleActive = true;

		this.robotraged = new Robot(65, 60, this.map);
		this.robotragedactive = true; 

		this.currentTime = 0;
}


Scene.prototype.update = function(deltaTime, level)
{
	// Keep track of time
	this.currentTime += deltaTime;
	

	var tilesheet = new Texture("imgs/TileSet.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level);
	this.player.updateMap(this.map);
	this.robotraged.updateMap(this.map);

	// Update sprites
	this.player.update(deltaTime);
	this.bubble.update(deltaTime);
	this.robotraged.update(deltaTime);
	
	if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;
	if(this.player.collisionBox().intersect(this.robotraged.collisionBox()))
		this.robotragedactive = false;
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	// Draw entities
	if(this.bubbleActive)
		this.bubble.draw();
	if(this.robotragedactive)
		this.robotraged.draw();
	this.player.draw();
}



