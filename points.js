const ONE_HUNDRED = 1; 
const TWO_HUNDRED = 2; 
const ONE_THOUSAND = 3; 
const TWO_THOUSAND = 4; 

function Points(){
    
}

function Points(x, y, map)
{
	var points = new Texture("imgs/points.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, points);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(ONE_HUNDRED, [0, 0, 16, 16]);

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(TWO_HUNDRED, [16,0,16,16]);

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(ONE_THOUSAND, [32,0,16,16]);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(TWO_THOUSAND, [48,0,16,16]);

    this.sprite.setAnimation(ONE_HUNDRED);
    
	this.map = map; 
}


Points.prototype.centpuntsanimation = function(){
    if(this.sprite.currentAnimation != ONE_HUNDRED) this.sprite.setAnimation(ONE_HUNDRED);
}
Points.prototype.docentspuntsanimation = function(){
    if(this.sprite.currentAnimation != TWO_HUNDRED) this.sprite.setAnimation(TWO_HUNDRED);
}


Points.prototype.update = function (deltaTime)
{
    this.sprite.y -= 4; 
	this.sprite.update(deltaTime);
}

Points.prototype.draw = function ()
{
	this.sprite.draw();
}

Points.prototype.collisionBox = function ()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

