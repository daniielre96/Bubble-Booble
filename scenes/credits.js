// Main menu

function Credits(){

    this.currentTime = 0;
}

Credits.prototype.checkActualLevel = function(){

    if(keyboard[27]) return 0;

    return 7;
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
    base_image.src = 'imgs/Credits.png';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}