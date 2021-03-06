
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var scene = new Menu();
var previousTimestamp;
var keyboard = [];
var interacted;
var levels = [level1, level2, level3, level4, level5];
var actualScreen;

//Sounds 
var music;
var shootMusic;
var deathMusic;
var musicEnabled;
var pickUpMusic;
var catchEnemyMusic;
var explodeBubbleMusic;
var passLevelMusic;
var hurryUpMusic;
var badEndingMusic;
var goodEndingMusic;

var goodMode;
var pause;
var score;
var highScore;


// Control keyboard events

function keyDown(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;
		if(keycode.which == 71) goodMode = !goodMode;
		if(keycode.which == 80) pause = !pause;
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

	// MUSIC 
	music = AudioFX('sounds/Main Theme.mp3', { loop: true });
	shootMusic = AudioFX('sounds/shoot.wav', {loop: false });
	deathMusic = AudioFX('sounds/deathsound.mp3', {loop: false});
	pickUpMusic = AudioFX('sounds/rewards_pickup.wav', {loop: false});
	catchEnemyMusic = AudioFX('sounds/catch_enemy.wav', {loop: false});
	explodeBubbleMusic = AudioFX('sounds/bubble_pop.wav', {loop: false});
	passLevelMusic = AudioFX('sounds/next_level.wav', {loop: false});
	hurryUpMusic = AudioFX('sounds/hurry_up.wav', {loop: false});
	badEndingMusic = AudioFX('sounds/bad_ending.mp3', {loop: true});
	goodEndingMusic = AudioFX('sounds/good_ending.mp3', {loop: true});
	musicEnabled = false;

	goodMode = false;
	pause = false;
	score = 0;
	highScore = 0;
}

function updateScreen(newScreen){

	if(actualScreen != newScreen){
		
		if(newScreen == 9) scene = new Congrats(actualScreen); 
		actualScreen = newScreen;

		if(actualScreen == 0) scene = new Menu();
		if(actualScreen == 1) scene = new Scene1();
		if(actualScreen == 2) scene = new Scene2();
		if(actualScreen == 3) scene = new Scene3();
		if(actualScreen == 4) scene = new Scene4();
		if(actualScreen == 5) scene = new Scene5();
		if(actualScreen == 6) scene = new Instructions(); 
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
		if(actualScreen == 10) scene = new GameOver();
		if(actualScreen == 11) scene = new Win(); 		

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

