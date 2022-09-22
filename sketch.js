var bg
var bird
var gameOver
var bgImg, planeImg, crashImg, gameOverImg, birdImg, restartImg, cloudImage
var cloud
var flight, flightcrash
var ground, invisibleGround, groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpSound, checkPointSound, dieSound



function preload() {
    bgImg = loadImage("sky.jpg")
    planeImg = loadImage("airplane.png")
    birdImg = loadImage("bird.png")
    gameOverImg = loadImage("gameover.png")
    cloudImage = loadImage("cloud.png");
    groundImage = loadImage("ground2.png");
    restartImg = loadImage("restart.png")
    crashImg = loadImage("flightcrash.png")
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
    checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
    createCanvas(600,600 )
    flight = createSprite(50, 150, 20, 50);
    flight.addImage(planeImg)
    flight.scale = 0.1

    bird = createSprite(200,100,20,50)
    bird.addImage(birdImg)
    bird.scale = 0.05
    bird.velocityX = -4

    ground = createSprite(200, 180, 400, 20);
    ground.addImage("ground", groundImage);
    ground.x = ground.width / 2;

    gameOver = createSprite(300, 100);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300, 140);
    restart.addImage(restartImg);

    invisibleGround = createSprite(200, 190, 400, 10);
    invisibleGround.visible = false;

    cloudsGroup = createGroup();

    flight.setCollider("circle", 0, 0, 40);
    flight.debug = false

    score = 0;

}

function draw() {
    background('white');
    text("Score: " + score, 500, 50);

    console.log(ground.y)

    if (gameState === PLAY) {
        gameOver.visible = false
        restart.visible = false
        ground.velocityX = -4
        if (score > 0 && score % 500 === 0) {
            checkPointSound.play();



        }
        score = score + Math.round(getFrameRate() / 60);

        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        if (keyDown("space")) {
            flight.velocityY = -16;
            jumpSound.play();
        }

        flight.velocityY = flight.velocityY + 0.8

        spawnClouds();


        if (ground.isTouching(flight)) {
            flight.velocityY = -12;
            gameState = END;
            dieSound.play();
        }
    }
    else if (gameState === END) {

        gameOver.visible = true;
        restart.visible = true;

        ground.velocityX = 0;
        flight.velocityY = 0
        flight.changeAnimation(crashImg);

        if (mousePressedOver(restart)) {
            reset();


        }
        
        cloudsGroup.setLifetimeEach(-1);
    }
if (flight.y>=180){
flight.velocityY = -4

}



    flight.collide(invisibleGround);





    drawSprites();

}

function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
        cloud = createSprite(600, 100, 40, 10);
        cloud.y = Math.round(random(10, 60));
        cloud.addImage(cloudImage);
        cloud.scale = 0.5;
        cloud.velocityX = -3;

        //assign lifetime to the variable
        cloud.lifetime = 134;

        //adjust the depth
        cloud.depth = flight.depth;
        flight.depth = flight.depth + 1;

        //adding cloud to the group
        cloudsGroup.add(cloud);
    }
}

function reset() {

    gameState = PLAY
    score = 0
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    flight.changeAnimation(flight);

}



