

const BUB_STAND_LEFT = 0;
const BUB_STAND_RIGHT = 1;
const BUB_WALK_LEFT = 2;
const BUB_WALK_RIGHT = 3;
const BUB_WALK_LEFT_SHOOT = 4; 
const BUB_WALK_RIGHT_SHOOT = 5; 
const BUB_SHOOT_LEFT = 6; 
const BUB_SHOOT_RIGHT = 7; 

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/TileSet.png");

	// Loading spritesheets
	var bub = new Texture("imgs/bub.png");
	var bubble = new Texture("imgs/bubble.png");

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

		// Loading spritesheets
		var bub = new Texture("imgs/bub.png");
		var bubble = new Texture("imgs/bubble.png");

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

		this.bubSprite.addAnimation();
		this.bubSprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [0, 0, 32, 32]);
		this.bubSprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [0, 32, 32, 32]);
		this.bubSprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [0, 96, 32, 32]);
		this.bubSprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [0, 64, 32, 32]);
		this.bubSprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [32, 96, 32, 32]);

		this.bubSprite.addAnimation();
		this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 0, 32, 32]);
		this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 32, 32, 32]);
		this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [0, 96, 32, 32]);
		this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 64, 32, 32]);
		this.bubSprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 96, 32, 32]);

		this.bubSprite.addAnimation();
		this.bubSprite.addKeyframe(BUB_SHOOT_LEFT, [0, 96, 32, 32]);
		this.bubSprite.addKeyframe(BUB_SHOOT_LEFT, [32, 96, 32, 32]);

		this.bubSprite.addAnimation();
		this.bubSprite.addKeyframe(BUB_SHOOT_RIGHT, [64, 96, 32, 32]);
		this.bubSprite.addKeyframe(BUB_SHOOT_RIGHT, [96, 96, 32, 32]);
		
		
		this.bubSprite.setAnimation(BUB_STAND_LEFT);

		// Prepare bubble sprite & its animation
		this.bubbleSprite = new Sprite(400, 160, 32, 32, 3, bubble);

		this.bubbleSprite.addAnimation();
		this.bubbleSprite.addKeyframe(0, [0, 0, 16, 16]);
		this.bubbleSprite.addKeyframe(0, [16, 0, 16, 16]);
		this.bubbleSprite.addKeyframe(0, [32, 0, 16, 16]);
		this.bubbleSprite.addKeyframe(0, [48, 0, 16, 16]);
	
		// Create tilemap
		this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level);
}


Scene.prototype.update = function(deltaTime, level)
{
	// Keep track of time
	this.currentTime += deltaTime;

	// Move Bub sprite
	if(keyboard[37]) // KEY_LEFT
	{
		if(this.bubSprite.currentAnimation != BUB_WALK_LEFT)
			this.bubSprite.setAnimation(BUB_WALK_LEFT);
		if(this.bubSprite.x >= 2)
			this.bubSprite.x -= 2;
	}
	else if(keyboard[39]) // KEY_RIGHT
	{
		if(this.bubSprite.currentAnimation != BUB_WALK_RIGHT)
			this.bubSprite.setAnimation(BUB_WALK_RIGHT);
		if(this.bubSprite.x < 478)
			this.bubSprite.x += 2;
	}
	else if(keyboard[32]) // KEY_SHOOT
	{
		if(this.bubSprite.currentAnimation != BUB_SHOOT_LEFT && this.bubSprite.currentAnimation == BUB_STAND_LEFT)
			this.bubSprite.setAnimation(BUB_SHOOT_LEFT);
		if(this.bubSprite.currentAnimation != BUB_SHOOT_RIGHT && this.bubSprite.currentAnimation == BUB_STAND_RIGHT)
			this.bubSprite.setAnimation(BUB_SHOOT_RIGHT);	
		if(this.bubSprite.x >= 2)
			this.bubSprite.x -= 0;
	}
	else
	{
		if(this.bubSprite.currentAnimation == BUB_WALK_LEFT)
			this.bubSprite.setAnimation(BUB_STAND_LEFT);
		if(this.bubSprite.currentAnimation == BUB_WALK_RIGHT)
			this.bubSprite.setAnimation(BUB_STAND_RIGHT);
		if(this.bubSprite.currentAnimation == BUB_SHOOT_LEFT)
			this.bubSprite.setAnimation(BUB_STAND_LEFT);
		if(this.bubSprite.currentAnimation == BUB_SHOOT_RIGHT)
			this.bubSprite.setAnimation(BUB_STAND_RIGHT);
	}

	var tilesheet = new Texture("imgs/TileSet.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level);

	// Update sprites
	this.bubSprite.update(deltaTime);
	this.bubbleSprite.update(deltaTime);
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

	// Draw bub sprite
	this.bubSprite.draw();

	// Draw enemy captured in a bubble sprite
	this.bubbleSprite.draw();
}



