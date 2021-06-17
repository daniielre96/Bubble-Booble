const ONE_HUNDRED = 0; 
const TWO_HUNDRED = 1; 
const FOUR_HUNDRED = 2; 
const ONE_THOUSAND = 3; 
const TWO_THOUSAND = 4;
const FOUR_THOUSAND = 5; 
const HUP_POINT = 6;

function Points(){
    
}

function Points(x, y, map, score)
{
	var points = new Texture("imgs/points.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 64, 32, 3, points);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(ONE_HUNDRED, [0, 0, 16, 16]);

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(TWO_HUNDRED, [16, 0,16,16]);

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(FOUR_HUNDRED, [0 ,48, 16,16])

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(ONE_THOUSAND, [32,0,16,16]);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(TWO_THOUSAND, [48,0,16,16]);

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(FOUR_THOUSAND, [16,48,16,16]);

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(HUP_POINT, [0, 16,64,16]);
    this.sprite.addKeyframe(HUP_POINT, [0,32,64,16]);

    if(score == 100) this.sprite.setAnimation(ONE_HUNDRED);
    if(score == 200) this.sprite.setAnimation(TWO_HUNDRED);
    if(score == 400) this.sprite.setAnimation(FOUR_HUNDRED);
    if(score == 1000) this.sprite.setAnimation(ONE_THOUSAND);
    if(score == 2000) this.sprite.setAnimation(TWO_THOUSAND);
    if(score == 4000) this.sprite.setAnimation(FOUR_THOUSAND);
    if(score == 1) this.sprite.setAnimation(HUP_POINT);
    
	this.map = map; 
}

Points.prototype.update = function (deltaTime, positionX, positionY)
{
    if(this.sprite.currentAnimation != HUP_POINT) this.sprite.y -= 2;
    else{
        if(this.sprite.currentAnimation != HUP_POINT) this.sprite.setAnimation(HUP_POINT);
        this.sprite.x = positionX;
        this.sprite.y = positionY - 30;
    }

	this.sprite.update(deltaTime);
}

Points.prototype.draw = function ()
{
	this.sprite.draw();
}

Points.prototype.readyToDelete = function (){

    return this.sprite.y < 0;
}

Points.prototype.collisionBox = function ()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}

