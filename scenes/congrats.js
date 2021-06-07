// Main menu

function Congrats(actualScreen){

    this.nextScreen = actualScreen +1;

    this.currentTime = 0;
}

Congrats.prototype.checkActualLevel = function(){

    if(keyboard[32]) return this.nextScreen;


    return 9;
}

Congrats.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;

    return this.checkActualLevel();
}

Congrats.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background

    base_image = new Image();
    base_image.src = 'imgs/bubblescreen.png';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}