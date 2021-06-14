

function HighScore(x, y)
{
	var bubble = new Texture("imgs/Layouts.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 80, 8, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 80, 8]);
}

HighScore.prototype.update = function (deltaTime)
{
	this.sprite.update(deltaTime);
}

HighScore.prototype.draw = function ()
{
	this.sprite.draw();
}

HighScore.prototype.collisionBox = function ()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

