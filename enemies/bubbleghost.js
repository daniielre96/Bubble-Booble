

function BubbleGhost(x, y)
{
	var bubble = new Texture("imgs/BubbleGhost.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
    this.sprite.addKeyframe(0, [32, 0, 16, 16]);

	this.timer = 0;

}

BubbleGhost.prototype.update = function (deltaTime)
{
	if(this.sprite.y > 48){
		this.sprite.y -= 4; 
	}

	this.timer += deltaTime;
	this.sprite.update(deltaTime);
}

BubbleGhost.prototype.getTimer = function(){
	return this.timer;
}

BubbleGhost.prototype.draw = function ()
{
	this.sprite.draw();
}

BubbleGhost.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




