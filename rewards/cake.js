function Cake(){
    
}

function Cake(x, y, map)
{
	var bubble = new Texture("imgs/Rewards.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [32, 0, 16, 16]);
    
	this.map = map; 

	this.Cakeactive = false;
	this.CakePicked = false;
}

Cake.prototype.disable = function (){
	this.drawable = false;
}

Cake.prototype.isDrawable = function (){
	return this.drawable;
}

Cake.prototype.update = function (deltaTime)
{
    this.sprite.y += 4; 
    if(this.map.collisionMoveDown(this.sprite))
		this.sprite.y -= 2;
	this.sprite.update(deltaTime);
}

Cake.prototype.draw = function ()
{
	this.sprite.draw();
}

Cake.prototype.collisionBox = function ()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

