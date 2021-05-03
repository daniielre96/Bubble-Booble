

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/TileSet.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level1);

	// Store current time
	this.currentTime = 0
}

function Scene(level){
		// Loading texture to use in a TileMap
		var tilesheet = new Texture("imgs/TileSet.png");
	
		// Create tilemap
		this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level);
}


Scene.prototype.update = function(deltaTime, level)
{
	// Keep track of time
	this.currentTime += deltaTime;

	var tilesheet = new Texture("imgs/TileSet.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level);
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();
}



