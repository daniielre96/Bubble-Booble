var movingrightrob = true; 

const ROBOT_MOV_RIGHT = 0;
const ROBOT_MOV_LEFT = 1;

function Robot(x, y, map)
{
	var robotraged = new Texture("imgs/EnemiesSelected_Normal.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 7, robotraged);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(ROBOT_MOV_RIGHT, [0, 0, 16, 16]);
	this.sprite.addKeyframe(ROBOT_MOV_RIGHT, [16, 0, 16, 16]);

    this.sprite.addAnimation(); 
    this.sprite.addKeyframe(ROBOT_MOV_LEFT, [0, 16, 16, 16]);
    this.sprite.addKeyframe(ROBOT_MOV_LEFT, [16, 16 ,16, 16]);

    this.sprite.setAnimation(ROBOT_MOV_RIGHT);

    this.map = map; 
    
    
    /*if(!this.map.collsionMoveDown(this.Sprite)){
        this.sprite.y -= 2;
    }*/
}



Robot.prototype.update = function update(deltaTime)
{
    this.sprite.y += 6;
    if(this.sprite.x < 464 && movingrightrob){
        this.sprite.x += 2;
        if(this.sprite.currentAnimation!= ROBOT_MOV_RIGHT) this.sprite.setAnimation(ROBOT_MOV_RIGHT);
        if(this.sprite.x >= 462){
            movingrightrob = false; 
        }
    }	
    if(this.sprite.x >= 32 && !movingrightrob){
        this.sprite.x -= 2;
        if(this.sprite.currentAnimation!= ROBOT_MOV_LEFT) this.sprite.setAnimation(ROBOT_MOV_LEFT);
        if(this.sprite.x <= 34){
            movingrightrob = true; 
        }
    }
    
    if(this.map.collisionMoveDown(this.sprite))
			this.sprite.y -= 2;

	this.sprite.update(deltaTime);
}

Robot.prototype.updateMap = function(map){
	this.map = map;
}


Robot.prototype.draw = function draw()
{   
	this.sprite.draw();
}

Robot.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}



