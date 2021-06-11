

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
    this.movingrightrob = true; 

    this.robotActive = true;
    this.bJumping = false;

    this.timer = 0;
}



Robot.prototype.update = function update(deltaTime)
{
    
    this.sprite.y += 6;

    this.timer += deltaTime;

    if(this.sprite.x < 448 && this.movingrightrob){
        this.sprite.x += 2;
        if(this.sprite.currentAnimation!= ROBOT_MOV_RIGHT) this.sprite.setAnimation(ROBOT_MOV_RIGHT);
        if(this.sprite.x >= 446){
            this.movingrightrob = false; 
        }
    }	
    if(this.sprite.x >= 32 && !this.movingrightrob){
        this.sprite.x -= 2;
        if(this.sprite.currentAnimation!= ROBOT_MOV_LEFT) this.sprite.setAnimation(ROBOT_MOV_LEFT);
        if(this.sprite.x <= 34){
            this.movingrightrob = true; 
        }
    }

    var randomTimer = Math.floor(Math.random() * 5000) + 1000; // between 3 and 7 seconds

    if(this.sprite.y <= 48) this.bJumping = false;

    if(this.bJumping){
			
        this.jumpAngle += 4;
        if(this.jumpAngle == 180)
        {
            this.bJumping = false;
            this.sprite.y = this.startY;
        }
        else
        {
            this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
            if(this.jumpAngle > 90)
                this.bJumping = !this.map.collisionMoveDown(this.sprite);
        }
	}
    else{
        // Move Bub so that it is affected by gravity
        this.sprite.y += 6;
        if(this.map.collisionMoveDown(this.sprite))
        {
            //this.sprite.y -= 2;

            // Check arrow up key. If pressed, jump.
            if(this.timer > 1000 && this.timer > randomTimer)
            {
                this.bJumping = true;
                this.jumpAngle = 0;
                this.startY = this.sprite.y;
                this.timer = 0;
            }
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
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
	
	return box;
}



