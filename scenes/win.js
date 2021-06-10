// Main menu

function Win(){

    this.currentTime = 0;
    base_image = new Image();
    base_image.src = 'imgs/win.jpg';
    music.stop();
    goodEndingMusic.play();
}

Win.prototype.checkActualLevel = function(){

    if(keyboard[27]){
        goodEndingMusic.stop();
        return 0;
    }

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

    var text = "Score: " + score;
    context.font = "24px Verdana";
    var textSize = context.measureText(text);
    context.fillStyle = "Yellow";
    context.fontweight = "Bold";
    context.fillText(text, 200, 400);

	// Clear background
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }

    
    

}