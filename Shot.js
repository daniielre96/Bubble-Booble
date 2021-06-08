const SHOT_NORMAL = 0;
const SHOT_EXPLODE = 1;

function Shot(){
    
}

function Shot(x, y, direction)
{
	var bubble = new Texture("imgs/Shot.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

    this.direction = direction; // 0 left 1 right

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SHOT_NORMAL, [0, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SHOT_EXPLODE, [16, 0, 16, 16]);
	this.sprite.addKeyframe(SHOT_EXPLODE, [32, 0, 16, 16]);
	this.sprite.addKeyframe(SHOT_EXPLODE, [48, 0, 16, 16]);

	this.sprite.setAnimation(SHOT_NORMAL);
    
	this.drawable = true;
	this.gravity = false;

	this.currentTime = 0;
}

function Shot(x, y, direction, explode)
{
	var bubble = new Texture("imgs/Shot.png");
	shootMusic.play();

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

    this.direction = direction; // 0 left 1 right

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SHOT_NORMAL, [0, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SHOT_EXPLODE, [16, 0, 16, 16]);
	this.sprite.addKeyframe(SHOT_EXPLODE, [32, 0, 16, 16]);
	this.sprite.addKeyframe(SHOT_EXPLODE, [48, 0, 16, 16]);

	this.sprite.setAnimation(SHOT_NORMAL);
    
	this.drawable = true;
	this.gravity = false;

	if(!explode) this.currentTime = 0;
	else this.currentTime = 5000;
}

Shot.prototype.explodeShot = function () {
	this.currentTime = 5000;
}

Shot.prototype.rightDirection = function (){
	return this.direction == 1;
}

Shot.prototype.leftDirection = function (){
	return this.direction == 0;
}

Shot.prototype.disable = function (){
	this.drawable = false;
}

Shot.prototype.activeGravity = function (){
	this.gravity = true;
}

Shot.prototype.isDrawable = function (){
	return this.drawable;
}

Shot.prototype.readyToDelete = function (){
	return this.currentTime > 6000;
}

Shot.prototype.readyToExplode = function () {
	return this.currentTime > 5000;
}

Shot.prototype.update = function (deltaTime)
{
	this.currentTime += deltaTime;

	if(!this.readyToExplode()){

		if(!this.gravity){
			if(this.direction == 0)
				this.sprite.x -= 8; 
			else this.sprite.x += 8; 
		}
		else{
			if(this.sprite.y > 48) this.sprite.y -= 4;
		}
	}

	if(this.readyToExplode() && this.sprite.currentAnimation != SHOT_EXPLODE){
		this.sprite.setAnimation(SHOT_EXPLODE);
	}

	this.sprite.update(deltaTime);
}

Shot.prototype.draw = function ()
{
	this.sprite.draw();
}

Shot.prototype.collisionBox = function ()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

