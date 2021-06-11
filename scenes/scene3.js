// Scene 1

function Scene3(){

    // Loading texture to use in a TileMap
    var tilesheet = new Texture("imgs/TileSet.png");  

    this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level3);

    this.player = new Player(200, 200, this.map); // player 

    // robots enemies

    this.robots = new Set();
    this.robots.add(new Robot(300, 60, this.map));
    this.robots.add(new Robot(200, 260, this.map));
    this.robots.add(new Robot(100, 360, this.map));

    // spider enemies //

    this.spiders = new Set();
    this.spiders.add(new Araña(120, 60, this.map));
    this.spiders.add(new Araña(220, 260, this.map));
    this.spiders.add(new Araña(320, 60, this.map));


    // bubble robots

    this.bubbleRobots = new Set();

    // bubble spiders

    this.bubbleSpiders = new Set();

    // bubbles

    this.bombolles = new Set();

    // rewards

    this.papas = new Set();

    this.fruits = new Set();


    // points

    this.points = new Set();

    this.currentTime = 0;
    this.previousTimeStamp = 0;
    this.timerToPickUpFruit = 0;

    this.gameOver = false;
    this.hurryupActivated = false;

    this.timerToGameOver = 0;
}

Scene3.prototype.checkshoot = function(){
    if(keyboard[32] && this.timerToGameOver == 0){
        var shoot; 

        if(this.player.positionright()){
            shoot = new Shot(this.player.sprite.x - 27, this.player.sprite.y, 0, false);
            if(this.map.collisionMoveLeft(shoot.sprite)) shoot = new Shot(this.player.sprite.x - 27, this.player.sprite.y, 0, true);
        }
        else{
             shoot = new Shot(this.player.sprite.x + 27 , this.player.sprite.y, 1, false);
              
             if(this.map.collisionMoveRight(shoot.sprite)) shoot = new Shot(this.player.sprite.x + 27, this.player.sprite.y, 1, true);
        }

        this.bombolles.add(shoot);
    }
}

Scene3.prototype.allEnemiesDead = function(){

    return this.spiders.size == 0 && this.robots.size == 0 && this.bubbleRobots.size == 0 && this.bubbleSpiders.size == 0;
}

Scene3.prototype.allRewardsPicked = function(){

    return this.fruits.size == 0 && this.papas.size == 0 && this.allEnemiesDead();
}

Scene3.prototype.checkActualLevel = function(){

    if(this.gameOver) return 10;

    if(keyboard[27]) return 0;
    if(keyboard[49]) return 1; 
    if(keyboard[50]) return 2; 
    if(((this.allEnemiesDead() && ((this.timerToPickUpFruit) > 10000))) || (this.allRewardsPicked())){
        passLevelMusic.play(); 
        return 9; 
    }
    if(keyboard[52]) return 4;
    if(keyboard[53]) return 5; 

    return 3;
}

Scene3.prototype.checkRobot = function(){

    this.bubbleRobots.forEach(element => {
        if(element.getTimer() > 5000){
            this.robots.add(new Robot(element.sprite.x, element.sprite.y, this.map));
            this.bubbleRobots.delete(element);
            explodeBubbleMusic.play();
        }
    });
}

Scene3.prototype.checkSpider = function(){

    this.bubbleSpiders.forEach(element => {
        if(element.getTimer() > 5000){
            this.spiders.add(new Araña(element.sprite.x, element.sprite.y, this.map));
            this.bubbleSpiders.delete(element);
            explodeBubbleMusic.play();
        }
    });
}

Scene3.prototype.checkColisionPlayerWithEnemy = function(){

    this.spiders.forEach(element => {
        if(this.player.collisionBox().intersect(element.collisionBox())){
            if(!goodMode && !this.gameOver){ // dead
                deathMusic.play();
                if(this.timerToGameOver == 0) this.timerToGameOver = this.currentTime;
                if(this.player.positionright()) this.player.deathanimationright();
                else this.player.deathanimationleft();
            }
            return;
        }
    });

    this.robots.forEach(element => {
        if(this.player.collisionBox().intersect(element.collisionBox())){
            if(!goodMode && !this.gameOver){ // dead
                deathMusic.play();
                if(this.timerToGameOver == 0) this.timerToGameOver = this.currentTime;
                if(this.player.positionright()) this.player.deathanimationright();
                else this.player.deathanimationleft();
            }
            return;
        }
    });

    if(this.timerToGameOver != 0 && ((this.currentTime - this.timerToGameOver) > 2000))
        this.gameOver = true;
    
}

Scene3.prototype.checkShotsWalls = function (){

    this.bombolles.forEach(element => {
        if(element.leftDirection()){
             if(this.map.collisionMoveLeft(element.sprite)){
                element.activeGravity();
             }
        }
        else{
            if(this.map.collisionMoveRight(element.sprite)){
                element.activeGravity();
            }
        }
    });

}

Scene3.prototype.explodeBubble = function(positionX, positionY){

    if(this.player.positionright()) this.bombolles.add(new Shot(positionX, positionY, 0, true));
    else this.bombolles.add(new Shot(positionX, positionY, 1, true));
}

Scene3.prototype.createRewards = function (){

    this.bubbleRobots.forEach(element => {

        if(this.player.collisionBox().intersect(element.collisionBox())){
            this.explodeBubble(element.sprite.x, element.sprite.y);
            this.bubbleRobots.delete(element);
            this.fruits.add(new Fruit(Math.floor(Math.random() * 449) + 32, Math.floor(Math.random() * 385) + 48, this.map));
        }

    });

    this.bubbleSpiders.forEach(element => {
        
        if(this.player.collisionBox().intersect(element.collisionBox())){
            this.explodeBubble(element.sprite.x, element.sprite.y);
            this.bubbleSpiders.delete(element);
            this.papas.add(new Papa(Math.floor(Math.random() * 449) + 32, Math.floor(Math.random() * 385) + 48, this.map));
        }
    });

}

Scene3.prototype.pickRewards = function(){

    this.fruits.forEach(element => {
        if(this.player.collisionBox().intersect(element.collisionBox())){
            this.points.add(new Points(element.sprite.x, element.sprite.y, this.map, 100));
            this.fruits.delete(element);
            pickUpMusic.play();
            score += 100;
        }
    });

    this.papas.forEach(element => {
        if(this.player.collisionBox().intersect(element.collisionBox())){
            this.points.add(new Points(element.sprite.x, element.sprite.y, this.map, 200));
            this.papas.delete(element);
            pickUpMusic.play();
            score += 200;
        }
    });
}

Scene3.prototype.catchEnemies = function(){

    
    this.bombolles.forEach(bubble => {

        this.robots.forEach(robot => {
            if(!bubble.hasGravity() && !bubble.readyToExplode() && bubble.collisionBox().intersect(robot.collisionBox())){
                this.bubbleRobots.add(new BubbleRobot(robot.sprite.x, robot.sprite.y, this.map));
                catchEnemyMusic.play();
                this.robots.delete(robot);
                this.bombolles.delete(bubble);
            }
        });

        this.spiders.forEach(spider => {
            if(!bubble.hasGravity() && !bubble.readyToExplode() && bubble.collisionBox().intersect(spider.collisionBox())){
                this.bubbleSpiders.add(new Bubble(spider.sprite.x, spider.sprite.y, this.map));
                catchEnemyMusic.play();
                this.spiders.delete(spider);
                this.bombolles.delete(bubble);
            }
        });

        if(this.player.collisionBox().intersect(bubble.collisionBox()) && !bubble.readyToExplode()){
            bubble.explodeShot();
        }

        if(bubble.readyToDelete()) this.bombolles.delete(bubble);

    });

}

Scene3.prototype.deletePoints = function (){

    this.points.forEach(point => {
        if(point.readyToDelete()) this.points.delete(point);
    });
}

Scene3.prototype.hurryup = function(){
    
    if(this.timerToPickUpFruit != 0 && !this.hurryupActivated){
        this.points.add(new Points(this.player.sprite.x, this.player.sprite.y - 30, this.map, 1));
        this.hurryupActivated = true;
        hurryUpMusic.play(); 
    }
}

Scene3.prototype.update = function(deltaTime){

    if(!pause){

        this.currentTime += deltaTime;

        if(this.allEnemiesDead()) this.timerToPickUpFruit += deltaTime;

        this.hurryup();

        // UPDATES

        this.player.update(deltaTime);

        this.robots.forEach(element => {
            element.update(deltaTime);
        });

        this.spiders.forEach(element => {
            element.update(deltaTime, this.player.sprite.x, this.player.sprite.y);
        });

        
        this.bombolles.forEach(element => {
            element.update(deltaTime);
        });

        this.fruits.forEach(element => {
            element.update(deltaTime);
        });

        this.papas.forEach(element => {
            element.update(deltaTime);
        });

        this.bubbleRobots.forEach(element => {
            element.update(deltaTime);
        });

        this.bubbleSpiders.forEach(element => {
            element.update(deltaTime);
        });

        this.points.forEach(element => {
            element.update(deltaTime, this.player.sprite.x, this.player.sprite.y);
        });

        if(this.previousTimeStamp == 0 || ((this.currentTime - this.previousTimeStamp) > 500)) {
            this.previousTimeStamp = this.currentTime; 
            this.checkshoot();
        }

        this.checkColisionPlayerWithEnemy();

        this.checkRobot();

        this.checkSpider();

        this.checkShotsWalls();

        this.createRewards();

        this.pickRewards();

        this.catchEnemies();

        this.deletePoints();
    }
    

    return this.checkActualLevel();
}

Scene3.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, canvas.height);

    // draw score

    var text = "Score: " + score;
    context.font = "bold 24px Verdana";
    var textSize = context.measureText(text);
    context.fillStyle = "Yellow";
    context.fillText(text, 10, 25);

    if(goodMode){
        var text = "GodMode";
        context.font = "bold 24px Verdana";
        var textSize = context.measureText(text);
        context.fillStyle = "Yellow";
        context.fillText(text, 380, 25);
    }

	// Draw tilemap
	this.map.draw();

	// Draw entities

    this.bubbleRobots.forEach(bubble => {
        bubble.draw();
    });
    
    this.bubbleSpiders.forEach(bubble =>{
        bubble.draw();
    });

	this.robots.forEach(robot => {
        robot.draw();
    });

    this.spiders.forEach(spider => {
        spider.draw();
    });
    
    this.bombolles.forEach(element => {
        element.draw();
    });

    this.fruits.forEach(fruit => {
        fruit.draw();
    });

    this.papas.forEach(papa => {
        papa.draw();
    });
    
    this.points.forEach(point =>{
        point.draw();
    });
    
	this.player.draw();

    if(pause){
        var text = "PAUSE";
        context.font = "bold 50px Verdana";
        var textSize = context.measureText(text);
        context.fillStyle = "Red";
        context.fillText(text, 256 - textSize.width/2, 224 + 12);
    }
    
}