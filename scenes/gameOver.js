// Main menu

function GameOver(){

    this.currentTime = 0;
}

GameOver.prototype.checkActualLevel = function(){

    if(keyboard[27]) return 0;

    return 10;
}

Credits.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;

    return this.checkActualLevel();
}

Credits.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background

    base_image = new Image();
    base_image.src = 'imgs/GameOver.jpg';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}