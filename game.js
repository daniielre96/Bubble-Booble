
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var scene = new Scene1();
var previousTimestamp;
var keyboard = [];
var interacted;
var levels = [level1, level2, level3, level4, level5];
var actualLevel;


// Control keyboard events

function keyDown(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;
}

function keyUp(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
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
	actualLevel = 0;
}

function updateLevel(newLevel){

	if(actualLevel != newLevel){
		actualLevel = newLevel;

		if(actualLevel == 0) scene = new Scene1();
		if(actualLevel == 1) scene = new Scene2();
		if(actualLevel == 2) scene = new Scene3();
		if(actualLevel == 3) scene = new Scene4();
		if(actualLevel == 4) scene = new Scene5();
	}
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp)
{
	var deltaTime = timestamp - previousTimestamp;
	if(deltaTime > TIME_PER_FRAME)
	{
		var newLevel = scene.update(deltaTime);
		updateLevel(newLevel);
		previousTimestamp = timestamp;
		scene.draw();
	}
	window.requestAnimationFrame(frameUpdate)
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

