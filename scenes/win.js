// Main menu

function Win(){

    this.currentTime = 0;
}

Win.prototype.checkActualLevel = function(){

    if(keyboard[27]) return 0;

    return 11;
}

Win.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;

    return this.checkActualLevel();
}

Win.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background

    base_image = new Image();
    base_image.src = 'imgs/win.jpg';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}