// Scene 1

function Scene1(){

    // Loading texture to use in a TileMap
    var tilesheet = new Texture("imgs/TileSet.png");  

    this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level1);

    this.player = new Player(224, 240, this.map);

    this.robotraged = new Robot(300, 60, this.map);
    this.robotragedactive = true; 


    this.arañaraged = new Araña(120, 60, this.map);
    this.arañaragedactive = true; 

    this.bombolles = new Set();

    this.papaactive = false;
    this.fruitactive = false;
    this.papaPicked = false;
    this.fruitPicked = false;

    this.currentTime = 0;
    this.previousTimeStamp = 0;
    this.timerToPickUpFruit = 0;

    this.gameOver = false;
}

Scene1.prototype.checkshoot = function(){
    if(keyboard[32]){
        var shoot; 

        if(this.player.positionright()) shoot = new Shot(this.player.sprite.x - 20, this.player.sprite.y, 0);
        else shoot = new Shot(this.player.sprite.x +20 , this.player.sprite.y, 1);

        this.bombolles.add(shoot);
    }
}

Scene1.prototype.checkActualLevel = function(){

    if(this.gameOver) return 10;

    if(keyboard[27]) return 0;
    if(keyboard[50] || ((!this.arañaragedactive && !this.robotragedactive && ((this.timerToPickUpFruit) > 10000))) || (!this.arañaragedactive && !this.robotragedactive && !this.fruitactive && !this.papaactive)) return 9;
    if(keyboard[51]) return 3;
    if(keyboard[52]) return 4;
    if(keyboard[53]) return 5;

    return 1;
}

Scene1.prototype.checkRobot = function(){

    if(this.robotraged instanceof BubbleRobot && this.robotraged.getTimer() > 5000 && this.robotragedactive){
        this.robotraged = new Robot(this.robotraged.sprite.x, this.robotraged.sprite.y, this.map);
    }
}

Scene1.prototype.checkSpider = function(){

    if(this.arañaraged instanceof Bubble && this.arañaraged.getTimer() > 5000 && this.arañaragedactive){
        this.arañaraged = new Araña(this.arañaraged.sprite.x, this.arañaraged.sprite.y, this.map);
    }
}

Scene1.prototype.checkColisionPlayerWithEnemy = function(){

    if(this.arañaraged instanceof Araña && this.player.collisionBox().intersect(this.arañaraged.collisionBox())){
        if(!goodMode) this.gameOver = true;
    }

    if(this.robotraged instanceof Robot && this.player.collisionBox().intersect(this.robotraged.collisionBox())){
        if(!goodMode) this.gameOver = true;
    }
}

Scene1.prototype.checkShotsWalls = function (){

    this.bombolles.forEach(element => {
        if(element.leftDirection()){
             if(this.map.collisionMoveLeft(element.sprite)){
                element.activeGravity();
             }
        }
        else{
            if(this.map.collisionMoveRight(element.sprite)){
                element.activeGravity();
            }
        }
    });

}

Scene1.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;

    if(!this.arañaragedactive && !this.robotragedactive) this.timerToPickUpFruit += deltaTime;

    this.player.update(deltaTime);
    this.robotraged.update(deltaTime);
    this.arañaraged.update(deltaTime, this.player.sprite.x, this.player.sprite.y);
    

    if(this.previousTimeStamp == 0 || ((this.currentTime - this.previousTimeStamp) > 250)) {
        this.previousTimeStamp = this.currentTime; 
        this.checkshoot();
    }

    this.checkColisionPlayerWithEnemy();

    this.checkRobot();

    this.checkSpider();

    this.checkShotsWalls();

    this.bombolles.forEach(element => {
        element.update(deltaTime);
    });
    
    if(this.robotraged instanceof BubbleRobot && this.player.collisionBox().intersect(this.robotraged.collisionBox())){
        this.robotragedactive = false;
        if(!this.fruitactive && !this.fruitPicked){
            this.fruit = new Fruit(Math.floor(Math.random() * 449) + 32, Math.floor(Math.random() * 385) + 48, this.map);
            this.fruitactive = true;
        }
        this.fruit.update(deltaTime);
    }

    if(this.fruitactive && this.player.collisionBox().intersect(this.fruit.collisionBox())){
        this.fruitactive = false; 
        this.fruitPicked = true;
    }
    
    if(this.arañaraged instanceof Bubble && this.player.collisionBox().intersect(this.arañaraged.collisionBox())){
        this.arañaragedactive = false;
        if(!this.papaactive && !this.papaPicked){
            this.papa = new Papa(Math.floor(Math.random() * 449) + 32, Math.floor(Math.random() * 385) + 48, this.map);
            this.papaactive = true;
        }
        this.papa.update(deltaTime);
    }

    if(this.papaactive && this.player.collisionBox().intersect(this.papa.collisionBox())){
        this.papaactive = false; 
        this.papaPicked = true;
    }

    this.bombolles.forEach(element => {
        if(element.collisionBox().intersect(this.robotraged.collisionBox()) && this.robotraged instanceof Robot){
            this.robotraged = new BubbleRobot(this.robotraged.sprite.x, this.robotraged.sprite.y, this.map); // convertim robot
            this.bombolles.delete(element);
        }
        if(element.collisionBox().intersect(this.arañaraged.collisionBox()) && this.arañaraged instanceof Araña){
            this.arañaraged = new Bubble(this.arañaraged.sprite.x, this.arañaraged.sprite.y); // convertim spider
            this.bombolles.delete(element);
        }

        if(this.player.collisionBox().intersect(element.collisionBox())) element.explodeShot();

        if(element.readyToDelete()) this.bombolles.delete(element);

    });
    
    
    return this.checkActualLevel();
}

Scene1.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	// Draw entities

	if(this.robotragedactive)
		this.robotraged.draw();

    if(this.arañaragedactive)
		this.arañaraged.draw();
    
    this.bombolles.forEach(element => {
            if(element.isDrawable()) element.draw();
    });

    if(this.fruitactive)
        this.fruit.draw(); 

    if(this.papaactive)
        this.papa.draw(); 
    
    
	this.player.draw();
    
}