
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var scene = new Menu();
var previousTimestamp;
var keyboard = [];
var interacted;
var levels = [level1, level2, level3, level4, level5];
var actualScreen;
var music;
var musicEnabled;


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
	actualScreen = 0;
	music = AudioFX('sounds/main_theme.mp3', { loop: true });
	musicEnabled = false;
}

function updateScreen(newScreen){

	if(actualScreen != newScreen){
		actualScreen = newScreen;

		if(actualScreen == 0) scene = new Menu();
		if(actualScreen == 1) scene = new Scene1();
		if(actualScreen == 2) scene = new Scene2();
		if(actualScreen == 3) scene = new Scene3();
		if(actualScreen == 4) scene = new Scene4();
		if(actualScreen == 5) scene = new Scene5();
		//if(actualScreen == 6) scene = new Instructions(); TO DO 
		if(actualScreen == 7) scene = new Credits();
		if(actualScreen == 8){
			if(musicEnabled){
				music.stop();
				musicEnabled = false;
			}
			else{
				music.play();
				musicEnabled = true;
			}
		}

	}
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp)
{
	var deltaTime = timestamp - previousTimestamp;
	if(deltaTime > TIME_PER_FRAME)
	{
		var newScreen = scene.update(deltaTime);
		updateScreen(newScreen);
		previousTimestamp = timestamp;
		scene.draw();
	}
	window.requestAnimationFrame(frameUpdate)
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

