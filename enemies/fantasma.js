

const Fantasma_MOV_LEFT = 0;
const Fantasma_MOV_RIGHT = 1;

function Fantasma(x, y, map)
{
	var Fantasmaraged = new Texture("imgs/fantasma.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 7, Fantasmaraged);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(Fantasma_MOV_LEFT, [0, 0, 16, 16]);
	this.sprite.addKeyframe(Fantasma_MOV_LEFT, [16, 0, 16, 16]);

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(Fantasma_MOV_RIGHT, [0, 16, 16, 16]);
    this.sprite.addKeyframe(Fantasma_MOV_RIGHT, [16, 16 ,16, 16]);

    this.sprite.setAnimation(Fantasma_MOV_RIGHT);

    this.map = map;
    this.movingrightrob = true; 

    this.FantasmaActive = true;
    this.bJumping = false;

    this.timer = 0;
}



Fantasma.prototype.update = function update(deltaTime)
{

    this.timer += deltaTime;

    const amplitude = 5;
    const frequency = 15;
   

    if(this.sprite.x < 448 && this.movingrightrob){
        this.sprite.x += 2;

        let alçada = this.sprite.y + amplitude * Math.sin(this.sprite.x/frequency); 
        if(alçada <= 432 && alçada >= 32)
            this.sprite.y = alçada;
           
        
        if(this.sprite.currentAnimation!= Fantasma_MOV_RIGHT) this.sprite.setAnimation(Fantasma_MOV_RIGHT);
        if(this.sprite.x >= 446){
            this.movingrightrob = false; 
        }
    }	
    if(this.sprite.x >= 32 && !this.movingrightrob){
        this.sprite.x -= 2;
        let alçada = this.sprite.y + amplitude * Math.sin(this.sprite.x/frequency); 
        if(alçada <= 432 && alçada >= 32)
            this.sprite.y = alçada;

        if(this.sprite.currentAnimation!= Fantasma_MOV_LEFT) this.sprite.setAnimation(Fantasma_MOV_LEFT);
        if(this.sprite.x <= 34){
            this.movingrightrob = true; 
        }
    }
    
    /*if(this.map.collisionMoveDown(this.sprite))
			this.sprite.y -= 2;*/

	this.sprite.update(deltaTime);
}

Fantasma.prototype.updateMap = function(map){
	this.map = map;
}


Fantasma.prototype.draw = function draw()
{   
	this.sprite.draw();
}

Fantasma.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
	
	return box;
}



