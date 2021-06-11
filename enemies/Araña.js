var movingrightaraña = true; 

const ARAÑA_MOV = 0; 

function Araña(x, y, map)
{
	var spiderraged = new Texture("imgs/ArañaSelected_Normal.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 7, spiderraged);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(ARAÑA_MOV, [0, 0, 16, 16]);
	this.sprite.addKeyframe(ARAÑA_MOV, [16, 0, 16, 16]);

    this.sprite.setAnimation(ARAÑA_MOV);

    this.bJumping = false;
	this.jumpAngle = 0;
	this.timer = 0;

    this.map = map;

	this.spiderActive = true;
	this.movingrightspider = true; 
}






Araña.prototype.update = function update(deltaTime, posplayerx, posplayery)
{
    this.sprite.y += 6;

	this.timer += deltaTime;

	if((Math.abs(this.sprite.x - posplayerx) + Math.abs(this.sprite.y - posplayery)) < 200){

		if(this.sprite.y - 6 == posplayery){
			if(this.sprite.x <= posplayerx){
				this.sprite.x += 2; 
			}
			if(this.sprite.x >= posplayerx ){
				this.sprite.x -= 2; 
			}
		}
		else{
			
			if(this.sprite.x < 464 && this.movingrightspider){
				this.sprite.x += 2;
				if(this.sprite.x >= 462){
					this.movingrightspider = false; 
				}
			}	
			if(this.sprite.x >= 32 && !this.movingrightspider){
				this.sprite.x -= 2;
				if(this.sprite.x <= 34){
					this.movingrightspider = true; 
				}
			}
		}
    
		if(this.sprite.y <= 48) this.bJumping = false;

		if(this.bJumping)
		{
			
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
		else
		{
			// Move Bub so that it is affected by gravity
			this.sprite.y += 6;
			if(this.map.collisionMoveDown(this.sprite))
			{
				//this.sprite.y -= 2;

				// Check arrow up key. If pressed, jump.
				if(this.sprite.y > posplayery)
				{
					this.bJumping = true;
					this.jumpAngle = 0;
					this.startY = this.sprite.y;
				}
			}
			
		}
	}else{

		if(this.sprite.x < 464 && this.movingrightspider){
			this.sprite.x += 2;
			if(this.sprite.x >= 462){
				this.movingrightspider = false; 
			}
		}	
		if(this.sprite.x >= 32 && !this.movingrightspider){
			this.sprite.x -= 2;
			if(this.sprite.x <= 34){
				this.movingrightspider = true; 
			}
		}

		var randomTimer = Math.floor(Math.random() * 7000) + 3000; // between 3 and 7 seconds

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
				if(this.timer > 3000 && this.timer > randomTimer)
				{
					this.bJumping = true;
					this.jumpAngle = 0;
					this.startY = this.sprite.y;
					this.timer = 0;
				}
			}
			
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



