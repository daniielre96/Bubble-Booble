

function BubbleRobot(x, y)
{
	var bubble = new Texture("imgs/bubbleRobot.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);

	this.timer = 0;
}

BubbleRobot.prototype.update = function (deltaTime)
{
	this.timer += deltaTime;
	this.sprite.update(deltaTime);
}

BubbleRobot.prototype.getTimer = function(){
	return this.timer;
}

BubbleRobot.prototype.draw = function ()
{
	this.sprite.draw();
}

BubbleRobot.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




