var movingright = true; 

const ARAÑA_MOV = 0; 

function Araña(x, y, map)
{
	var robotraged = new Texture("imgs/ArañaSelected_Normal.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 7, robotraged);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(ARAÑA_MOV, [0, 0, 16, 16]);
	this.sprite.addKeyframe(ARAÑA_MOV, [16, 0, 16, 16]);

    this.sprite.setAnimation(ARAÑA_MOV);

    this.map = map; 
    
    
    /*if(!this.map.collsionMoveDown(this.Sprite)){
        this.sprite.y -= 2;
    }*/
}



Araña.prototype.update = function update(deltaTime)
{
    this.sprite.y += 6;
    if(this.sprite.x < 464 && movingright){
        this.sprite.x += 2;
        if(this.sprite.x >= 462){
            movingright = false; 
        }
    }	
    if(this.sprite.x >= 32 && !movingright){
        this.sprite.x -= 2;
        if(this.sprite.x <= 34){
            movingright = true; 
        }
    }
    
    if(this.map.collisionMoveDown(this.sprite))
			this.sprite.y -= 2;

	this.sprite.update(deltaTime);
}

Araña.prototype.updateMap = function(map){
	this.map = map;
}


Araña.prototype.draw = function draw()
{   
	this.sprite.draw();
}

Araña.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
	
	return box;
}



