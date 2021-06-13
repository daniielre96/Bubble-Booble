// Main menu

function Instructions(){

    this.currentTime = 0;
}

Instructions.prototype.checkActualLevel = function(){

    if(keyboard[27]) return 0;

    return 6;
}

Instructions.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;

    return this.checkActualLevel();
}

Instructions.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background

    base_image = new Image();
    base_image.src = 'imgs/Instructions.png';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}