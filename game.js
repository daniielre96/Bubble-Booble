
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var scene = new Scene(level1);
var previousTimestamp;
var keyboard = [];
var interacted;
var levels = [level1, level2, level3, level4, level5];
var actualLevel = 0;


// Control keyboard events

function keyDown(keycode)
{
	if(keycode.which == 40){
		keyboard[keycode.which] = true;
		if (actualLevel > 0) actualLevel--;
	}

}

function keyUp(keycode)
{
	if(keycode.which == 38){
		keyboard[keycode.which] = false;
		if(actualLevel < 4) actualLevel++;
	}
}

function click()
{
	interacted = true;
}

// Initialization

function init()
{
	for(var i=0; i<256; i++)
		keyboard.push(false);
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp)
{
	var deltaTime = timestamp - previousTimestamp;
	if(deltaTime > TIME_PER_FRAME)
	{
		scene.update(deltaTime, levels[actualLevel]);
		previousTimestamp = timestamp;
		scene.draw();
	}
	window.requestAnimationFrame(frameUpdate)
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

