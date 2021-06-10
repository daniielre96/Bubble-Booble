// Main menu

function Menu(){

    score = 0;

    this.currentTime = 0;
}

Menu.prototype.checkActualLevel = function(){

    if(keyboard[49]) return 1;
    if(keyboard[50]) return 6;
    if(keyboard[51]) return 7;
    if(keyboard[52]) return 8;

    return 0;
}

Menu.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;

    return this.checkActualLevel();
}

Menu.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background

    base_image = new Image();
    base_image.src = 'imgs/Menu.png';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}