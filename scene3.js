// Scene 3

function Scene3(){

    // Loading texture to use in a TileMap
    var tilesheet = new Texture("imgs/TileSet.png");

    this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level3);

    this.player = new Player(224, 240, this.map);

    this.bubble = new Bubble(360, 112);
    this.bubbleActive = true;

    this.robotraged = new Robot(65, 60, this.map);
    this.robotragedactive = true; 

    this.currentTime = 0;
}

Scene3.prototype.checkActualLevel = function(){

    if(keyboard[27]) return 0;
    if(keyboard[49]) return 1;
    if(keyboard[50]) return 2;
    if(keyboard[52]) return 4;
    if(keyboard[53]) return 5;

    return 3;
}

Scene3.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;

    this.player.update(deltaTime);
    this.bubble.update(deltaTime);
    this.robotraged.update(deltaTime);

    if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
        this.bubbleActive = false;
    if(this.player.collisionBox().intersect(this.robotraged.collisionBox()))
        this.robotragedactive = false;

    return this.checkActualLevel();
}

Scene3.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	// Draw entities
	if(this.bubbleActive)
		this.bubble.draw();

	if(this.robotragedactive)
		this.robotraged.draw();

	this.player.draw();
}