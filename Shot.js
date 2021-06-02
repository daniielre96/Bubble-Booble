function Shot(){
    
}

function Shot(x, y, direction)
{
	var bubble = new Texture("imgs/Shot.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

    this.direction = direction; 

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
    

}


Shot.prototype.update = function update(deltaTime)
{
    if(this.direction == 0)
        this.sprite.x -= 8; 
    else this.sprite.x += 8; 
	this.sprite.update(deltaTime);
}

Shot.prototype.draw = function draw()
{
	this.sprite.draw();
}

Shot.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

