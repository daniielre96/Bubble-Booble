

function Score(x, y)
{
	var bubble = new Texture("imgs/Layouts.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 40, 8, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 8, 40, 8]);
}

Score.prototype.update = function (deltaTime)
{
	this.sprite.update(deltaTime);
}

Score.prototype.draw = function ()
{
	this.sprite.draw();
}

Score.prototype.collisionBox = function ()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

