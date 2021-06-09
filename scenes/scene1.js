// Scene 1

function Scene1(){

    // Loading texture to use in a TileMap
    var tilesheet = new Texture("imgs/TileSet.png");  

    this.map = new Tilemap(tilesheet, [16, 16], [3, 2], [0, 32], level1);

    this.player = new Player(224, 240, this.map); // player 

    // robots enemies

    this.robots = new Set();
    this.robots.add(new Robot(300, 60, this.map));

    // spider enemies //

    this.spiders = new Set();
    this.spiders.add(new Araña(120, 60, this.map));

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

    this.timerToGameOver = 0;
}

Scene1.prototype.checkshoot = function(){
    if(keyboard[32] && this.timerToGameOver == 0){
        var shoot; 

        if(this.player.positionright()){
            shoot = new Shot(this.player.sprite.x - 27, this.player.sprite.y, 0);
            if(this.map.collisionMoveLeft(shoot.sprite)) shoot = new Shot(this.player.sprite.x - 27, this.player.sprite.y, 0, true);
        }
        else{
             shoot = new Shot(this.player.sprite.x + 27 , this.player.sprite.y, 1);
              
             if(this.map.collisionMoveRight(shoot.sprite)) shoot = new Shot(this.player.sprite.x + 27, this.player.sprite.y, 1, true);
        }

        this.bombolles.add(shoot);
    }
}

Scene1.prototype.allEnemiesDead = function(){

    return this.spiders.size == 0 && this.robots.size == 0 && this.bubbleRobots.size == 0 && this.bubbleSpiders.size == 0;
}

Scene1.prototype.allRewardsPicked = function(){

    return this.fruits.size == 0 && this.papas.size == 0 && this.allEnemiesDead();
}

Scene1.prototype.checkActualLevel = function(){

    if(this.gameOver) return 10;

    if(keyboard[27]) return 0;
    if(keyboard[50] || ((this.allEnemiesDead() && ((this.timerToPickUpFruit) > 10000))) || (this.allRewardsPicked())) return 9;
    if(keyboard[51]) return 3;
    if(keyboard[52]) return 4;
    if(keyboard[53]) return 5;

    return 1;
}

Scene1.prototype.checkRobot = function(){

    this.bubbleRobots.forEach(element => {
        if(element.getTimer() > 5000){
            this.robots.add(new Robot(element.sprite.x, element.sprite.y, this.map));
            this.bubbleRobots.delete(element);
        }
    });
}

Scene1.prototype.checkSpider = function(){

    this.bubbleSpiders.forEach(element => {
        if(element.getTimer() > 5000){
            this.spiders.add(new Araña(element.sprite.x, element.sprite.y, this.map));
            this.bubbleSpiders.delete(element);
        }
    });
}

Scene1.prototype.checkColisionPlayerWithEnemy = function(){

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

Scene1.prototype.checkShotsWalls = function (){

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

Scene1.prototype.explodeBubble = function(positionX, positionY){

    if(this.player.positionright()) this.bombolles.add(new Shot(positionX, positionY, 0, true));
    else this.bombolles.add(new Shot(positionX, positionY, 1, true));
}

Scene1.prototype.createRewards = function (){

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

Scene1.prototype.pickRewards = function(){

    this.fruits.forEach(element => {
        if(this.player.collisionBox().intersect(element.collisionBox())){
            this.fruits.delete(element);
        }
    });

    this.papas.forEach(element => {
        if(this.player.collisionBox().intersect(element.collisionBox())){
            this.papas.delete(element);
        }
    });
}

Scene1.prototype.catchEnemies = function(){

    
    this.bombolles.forEach(bubble => {

        this.robots.forEach(robot => {
            if(!bubble.readyToExplode() && bubble.collisionBox().intersect(robot.collisionBox())){
                this.bubbleRobots.add(new BubbleRobot(robot.sprite.x, robot.sprite.y, this.map));
                this.robots.delete(robot);
                this.bombolles.delete(bubble);
            }
        });

        this.spiders.forEach(spider => {
            if(!bubble.readyToExplode() && bubble.collisionBox().intersect(spider.collisionBox())){
                this.bubbleSpiders.add(new Bubble(spider.sprite.x, spider.sprite.y, this.map));
                this.spiders.delete(spider);
                this.bombolles.delete(bubble);
            }
        });

        if(this.player.collisionBox().intersect(bubble.collisionBox())) bubble.explodeShot();

        if(bubble.readyToDelete()) this.bombolles.delete(bubble);

    });

}

Scene1.prototype.update = function(deltaTime){

    this.currentTime += deltaTime;

    if(this.allEnemiesDead()) this.timerToPickUpFruit += deltaTime;

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

    if(this.previousTimeStamp == 0 || ((this.currentTime - this.previousTimeStamp) > 250)) {
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

    
    

    return this.checkActualLevel();
}

Scene1.prototype.draw = function (){

    // Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

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
    
	this.player.draw();
    
}