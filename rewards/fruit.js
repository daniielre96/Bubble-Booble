function Fruit(){
    
}

function Fruit(x, y, map)
{
	var bubble = new Texture("imgs/Rewards.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
    
	this.map = map; 

	this.fruitactive = false;
	this.fruitPicked = false;
}

Fruit.prototype.disable = function (){
	this.drawable = false;
}

Fruit.prototype.isDrawable = function (){
	return this.drawable;
}

Fruit.prototype.update = function (deltaTime)
{
    this.sprite.y += 4; 
    if(this.map.collisionMoveDown(this.sprite))
		this.sprite.y -= 2;
	this.sprite.update(deltaTime);
}

Fruit.prototype.draw = function ()
{
	this.sprite.draw();
}

Fruit.prototype.collisionBox = function ()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

