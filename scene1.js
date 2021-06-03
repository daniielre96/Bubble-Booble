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

    this.bombolles = [];

    this.currentTime = 0;
    this.previousTimeStamp = 0; 
}

Scene1.prototype.checkshoot = function(){
    if(keyboard[32]){
        var shoot; 

        if(this.player.positionright()) shoot = new Shot(this.player.sprite.x - 16, this.player.sprite.y, 0);
        else shoot = new Shot(this.player.sprite.x +16 , this.player.sprite.y, 1);

        this.bombolles.push(shoot);
    }
}

Scene1.prototype.checkActualLevel = function(){

    if(keyboard[27]) return 0;
    if(keyboard[50]) return 2;
    if(keyboard[51]) return 3;
    if(keyboard[52]) return 4;
    if(keyboard[53]) return 5;

    return 1;
}

Scene1.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;


    this.player.update(deltaTime);
    this.robotraged.update(deltaTime);
    this.arañaraged.update(deltaTime);

    if(this.previousTimeStamp == 0 || (this.currentTime - this.previousTimeStamp > 150)) {
        this.previousTimeStamp = this.currentTime; 
        this.checkshoot(); 
    }

    this.bombolles.forEach(element => {
        element.update(deltaTime);
    });
    
    if(this.player.collisionBox().intersect(this.robotraged.collisionBox()))
        this.robotragedactive = false;
    if(this.player.collisionBox().intersect(this.arañaraged.collisionBox()))
        this.arañaragedactive = false;

    this.bombolles.forEach(element => {
        if(element.collisionBox().intersect(this.robotraged.collisionBox())){
            this.robotraged = new BubbleRobot(this.robotraged.sprite.x, this.robotraged.sprite.y, this.map); // convertim robot
            element.disable();
        }
        if(element.collisionBox().intersect(this.arañaraged.collisionBox())){
            this.arañaraged = new Bubble(this.arañaraged.sprite.x, this.arañaraged.sprite.y); // convertim spider
            element.disable();
        }
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
    
	this.player.draw();
}