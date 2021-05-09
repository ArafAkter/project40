var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;

var text1 = "no"

function preload(){
  //jumpSound = loadSound("jump.wav")
  //collidedSound = loadSound("collided.wav")
  
  backgroundImg = loadImage("backgroundImg.png")
  sunAnimation = loadImage("sun.png");
  
  trex_running = loadAnimation("trex_2.png","trex_1.png","trex_3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth , displayHeight - 360);
  
  sun = createSprite(350,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.1
  
  trex = createSprite(50,330,20,50);
     
  //night = createSprite(windowWidth + 340000, windowHeight - 100,           windowWidth + 76000, windowHeight*2   )
 // night.velocityX = -150
  //night.shapeColor=("black")
  
  //sprite1 = createSprite(windowWidth + 400000, windowHeight - 100, 75,     windowHeight*2 ) 
  
  //sprite2 = createSprite(windowWidth - 400000, windowHeight - 100, 75,     windowHeight*2 ) 
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider('circle',0,0,350)
  trex.scale = 0.08
  // trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width+1000,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  visibleGround = createSprite(width/2,height-10,width+1000,135);  
  visibleGround.shapeColor = "#f4cbaa";
  
  //ground = createSprite(width/2,-500,width,2);
  //ground.addImage("ground",groundImage);
  //ground.x = width/2
 // ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
 // ground.velocityX = obstaclesGroup.velocityEach
  score = 0;
}

function draw() {
  //trex.debug = true;
//
  background(backgroundImg);
  // background("rgb(0,500,999)")
  stroke("white")
  textSize(20);
  textFont("caveat")
  fill("black")
  text("Score: "+ score,trex.x - 75,50);
// text(Math.round(trex.x),trex.x + 375,100)
  
//  night.bounceOff(sprite1);
  //night.bounceOff(sprite2);
  //cars = [trex]
  sun.x = trex.x + 325 
 // var index = 0;
  //var x = 0;
  //var y = 1500
  obstacles1 = createSprite(1250,height-95)
  obstacles1.addImage(obstacle1);

  obstacles2 = createSprite(1750,height-95)
  obstacles2.addImage(obstacle2)

  sprite = createSprite(0,0,120,20)
sprite.x = obstacles2.x
sprite.y = obstacles2.y
sprite.visible = false
 // obstacles3 = createSprite(2350,height-95)
 // obstacles3.addImage(obstacle2)

 // obstacles4 = createSprite(3000,height-95)
  //obstacles4.addImage(obstacle1)

 // obstacles5 = createSprite(3800,height-95)
 // obstacles5.addImage(obstacle1)


obstacles1.setCollider('circle',0,0,45)
  camera.position.x = trex.x + 500
  //camera.position.y = cars[index-1].y
 
  //obstaclesGroup.setVelocityXEach(-(7.5 + 1.5*score/100)) 
 // ground.velocityX = 0
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
   // ground.velocityX = -(7.5 + 1.5*score/100);
   trex.velocityX = (7.5 + 1.5*score/100)

    if(touches.length < 0 || (keyDown("SPACE")) && trex.y  >= height-110) {
      //jumpSound.play( )
      trex.velocityY = -14;
      
    }

    
    trex.velocityY = trex.velocityY + 1
    
  
   // if (ground.x < trex.x - width/2){
     // ground.x = ground.width/2 + trex.x/2;
    //}
  
    trex.collide(invisibleGround);
    invisibleGround.x = trex.x
    visibleGround.x = trex.x
  //  invisibleGround.velocityX = (7.5 + 1.5*score/100)
  //  visibleGround.velocityX = (7.5 + 1.5*score/100)
   // spawnClouds();
   // spawnObstacles();
  
    if(obstacles1.isTouching(trex) || sprite.isTouching(trex) ){
      //  collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    trex.velocityX = 0
    //night.destroy();
    gameOver.x = trex.x + 250
    restart.x = trex.x + 250
    //set velcity of each game object to 0
 //   ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
    if(obstacles1.x < displayWidth){
      obstacles1.destroy()
    }
    if(obstacles2.x < displayWidth){
      obstacles2.destroy()
    } 
   
  
  }
  bump1 = createSprite(1600,height-80,15,10) ;
   bump1.shapeColor = "#f4cbaa";

   bump2 = createSprite(2200,height-80,15,10) ;
   bump2.shapeColor = "#f4cbaa";
  if(keyDown("down")){
   // trex.rotation = 270
   //trex.scale = 0.07 
  }
  else{
 //  trex.rotation = 360
   //trex.scale = 0.08   
  }
  //trex.x = trex.x
  if(mousePressedOver(restart)){
    reset()
  }
if(text1 === "yes"){
  text("You Win", trex.x + 225,200)
}

   if(trex.x > 2000){
     gameState = END
     gameOver.visible = false
  //   text("You Win",width/2,height/2- 50)
  text1 = "yes"
   }

  obstacles1.scale = 0.3;
  obstacles2.scale = 0.3;


  trex.debug = true
 obstacles1.debug = true
  obstacles2.debug = true

 // 
 obstacles1.setCollider('circle',0,0,45)
 //obstacles2.setCollider('circle',0,0,0.00000000000000000001)


 trex.setCollider('rectangle',0,0,22.5,580)
// trex.x = trex.x
 obstacles1.depth = 1
 obstacles2.depth = 1

  drawSprites();
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  obstacles1.x = 1250
  trex.x = 50
  trex.changeAnimation("running",trex_running);
  
  score = 0;
 text1 = "no" 
}
