
const BUB_STAND_LEFT = 0;
const BUB_STAND_RIGHT = 1;
const BUB_WALK_LEFT = 2;
const BUB_WALK_RIGHT = 3;
const BUB_WALK_LEFT_SHOOT = 4; 
const BUB_WALK_RIGHT_SHOOT = 5; 
const BUB_SHOOT_LEFT = 6; 
const BUB_SHOOT_RIGHT = 7; 


function Player(x, y, map)
{
	// Loading spritesheets
	var bub = new Texture("imgs/bub.png");

	// Prepare Bub sprite & its animations
	this.sprite = new Sprite(x, y, 32, 32, 7, bub);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUB_STAND_LEFT, [0, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUB_STAND_RIGHT, [32, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUB_WALK_LEFT, [0, 0, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_LEFT, [0, 32, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_LEFT, [0, 64, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUB_WALK_RIGHT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_RIGHT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_RIGHT, [32, 64, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [0, 0, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [0, 32, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [0, 96, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [0, 64, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_LEFT_SHOOT, [32, 96, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [64, 96, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [32, 64, 32, 32]);
	this.sprite.addKeyframe(BUB_WALK_RIGHT_SHOOT, [64, 96, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUB_SHOOT_LEFT, [0, 96, 32, 32]);
	this.sprite.addKeyframe(BUB_SHOOT_LEFT, [32, 96, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUB_SHOOT_RIGHT, [64, 96, 32, 32]);
	this.sprite.addKeyframe(BUB_SHOOT_RIGHT, [96, 96, 32, 32]);

	this.sprite.setAnimation(BUB_STAND_RIGHT);
	
	// Set tilemap for collisions
	this.map = map;
	
	// Set attributes for jump
	this.bJumping = false;
	this.jumpAngle = 0;
}

Player.prototype.updateMap = function(map){
	this.map = map;
}


Player.prototype.update = function(deltaTime)
{
	if(keyboard[37] && keyboard[32]){ //Key_Left and Shoot
		if(this.sprite.currentAnimation != BUB_WALK_LEFT_SHOOT && this.sprite.currentAnimation != BUB_WALK_RIGHT)
			this.sprite.setAnimation(BUB_WALK_LEFT_SHOOT);
		if(this.sprite.x >= 2)
		this.sprite.x -= 4;
	}else if(keyboard[39] && keyboard[32]){ //Key_Left and Shoot
		if(this.sprite.currentAnimation != BUB_WALK_RIGHT_SHOOT && this.sprite.currentAnimation != BUB_WALK_LEFT)
			this.sprite.setAnimation(BUB_WALK_RIGHT_SHOOT);
		if(this.sprite.x >= 2)
		this.sprite.x += 4;
	}

	else if(keyboard[37]) // KEY_LEFT
	{
		if(this.sprite.currentAnimation != BUB_WALK_LEFT)
			this.sprite.setAnimation(BUB_WALK_LEFT);
		if(this.sprite.x >= 2)
			this.sprite.x -= 4;
	}
	else if(keyboard[39]) // KEY_RIGHT
	{
		if(this.sprite.currentAnimation != BUB_WALK_RIGHT)
			this.sprite.setAnimation(BUB_WALK_RIGHT);
		if(this.sprite.x < 478)
			this.sprite.x += 4;
	}
	else if(keyboard[32]) // KEY_SHOOT
	{
		if(this.sprite.currentAnimation != BUB_SHOOT_LEFT && (this.sprite.currentAnimation == BUB_STAND_LEFT ||this.sprite.currentAnimation == BUB_WALK_LEFT || this.sprite.currentAnimation == BUB_WALK_LEFT_SHOOT))
			this.sprite.setAnimation(BUB_SHOOT_LEFT);
		if(this.sprite.currentAnimation != BUB_SHOOT_RIGHT && (this.sprite.currentAnimation == BUB_STAND_RIGHT || this.sprite.currentAnimation == BUB_WALK_RIGHT || this.sprite.currentAnimation == BUB_WALK_RIGHT_SHOOT))
			this.sprite.setAnimation(BUB_SHOOT_RIGHT);
		if(this.sprite.x >= 2)
			this.sprite.x -= 0;
	}
	else
	{
		if(this.sprite.currentAnimation == BUB_WALK_LEFT || this.sprite.currentAnimation == BUB_SHOOT_LEFT || this.sprite.currentAnimation == BUB_WALK_LEFT_SHOOT || this.sprite.currentAnimation == BUB_STAND_LEFT)
			this.sprite.setAnimation(BUB_STAND_LEFT);
		else
			this.sprite.setAnimation(BUB_STAND_RIGHT);
	}

	
	if(this.bJumping)
	{
		this.jumpAngle += 4;
		if(this.jumpAngle == 180)
		{
			this.bJumping = false;
			this.sprite.y = this.startY;
		}
		else
		{
			this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
			if(this.jumpAngle > 90)
				this.bJumping = !this.map.collisionMoveDown(this.sprite);
		}
	}
	else
	{
		// Move Bub so that it is affected by gravity
		this.sprite.y += 6;
		if(this.map.collisionMoveDown(this.sprite))
		{
			//this.sprite.y -= 2;

			// Check arrow up key. If pressed, jump.
			if(keyboard[38])
			{
				this.bJumping = true;
				this.jumpAngle = 0;
				this.startY = this.sprite.y;
			}
		}
		
	}
	
	// Update sprites
	this.sprite.update(deltaTime);
}

Player.prototype.draw = function()
{
	this.sprite.draw();
}

Player.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
	
	return box;
}




