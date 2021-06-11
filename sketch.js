var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  playerstop=loadAnimation("Monkey_08.png");
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(displayWidth-30,displayHeight-30);
  
  backgr=createSprite(0,0,displayWidth,displayHeight);
  backgr.addImage(backImage);
  backgr.scale=2.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(displayWidth/2-500,displayHeight/2,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  player.addAnimation("stop",playerstop);
  
  ground = createSprite(400,displayHeight-200,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  if(gameState===PLAY)
  {
  //camera.x=player.x;
  camera.y=player.y;

    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){
      gameState=END; 
      //  player.scale=0.08;
     // score=score-2;
    }
}
else if(gameState===END)
{
  player.changeAnimation("stop",playerstop);
  backgr.velocityX=0;
  ground.velocityX=0;
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);
player.velocityY=0;

  
}
player.collide(ground);

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, displayWidth-200,displayHeight/2);
  if(gameState===END)
  {
    stroke("white");
  textSize(40);
  fill("white");
  text("GAME OVER ", displayWidth/2-100,displayHeight/2);
    

  }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,200,40,10);
    banana.y = random(200,250);    
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,displayHeight-250,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
