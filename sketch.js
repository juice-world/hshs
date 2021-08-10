var PLAY= 1;
var END= 0;
var gamestate=PLAY;
var dino;
var ground;
var groundImage;
var dinoRunning;
var invisGround;
var cloud;
var cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var groupClouds;
var groupObstacles;
var score;
var collide;
var restart;
var gameOver;
var collideImage;
var restartImage;
var gameOverImage;
var dieMP3;
var checkpointMP3;
var jumpMP3;
function preload(){
  groundImage=loadImage("ground2.png");
dinoRunning=loadAnimation(

  "trex1.png","trex2.png","trex3.png"
);
cloudImage=loadImage("cloud.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
collideImage=loadImage("trex_collided.png");
restartImage=loadImage("restart.png");
gameOverImage=loadImage("gameOver.png");
dieMP3=loadSound("die.mp3");
checkpointMP3=loadSound("checkpoint.mp3");
jumpMP3=loadSound("jump.mp3");
}

function setup(){
createCanvas(windowWidth,windowHeight);
dino=createSprite(50,height-70,20,50);
dino.scale=0.5;
score=0;

dino.addAnimation("running",dinoRunning);

ground=createSprite(width/2,height-10,width,51);
ground.addImage("ground",groundImage);
ground.x=ground.width/2;


invisGround=createSprite(width/2,height,width,11);
invisGround.visible=false;
groupObstacles=createGroup();
groupClouds=createGroup();

dino.addAnimation("collided",collideImage);

gameOver=createSprite(width/2,height/2-50);
gameOver.addImage(gameOverImage);
gameOver.scale=0.5;

restart=createSprite(width/2,height/2);
restart.addImage(restartImage);
restart.scale=0.5;
dino.setCollider("circle",0,0,40);
}

function draw(){
  background("#A0E6FF");
text("winter dino runner- "+score,620,50);

if(gamestate===PLAY){
  gameOver.visible=false;
  restart.visible=false;
  score=score+Math.round(frameCount/60);
  ground.velocityX=-(7+3*score/100);
  dino.changeAnimation("running",dinoRunning);
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(touches.length>0 || keyDown("space") && dino.y>=height-100){
  dino.velocityY=-6;
  touches=[];
  jumpMP3.play();
  }
  dino.velocityY=dino.velocityY+0.4;
 
if(score>0 && score %1000===0){
  checkpointMP3.play();
}
 
  spawnObstacles();
  spawnCloud();
if(groupObstacles.isTouching(dino)){
  gamestate=END;
  dieMP3.play();
}

}
else if(gamestate === END){
  gameOver.visible=true;
  restart.visible=true;
  dino.velocityY=0;
  ground.velocityX=0;
  groupObstacles.setVelocityXEach(0);
  groupClouds.setVelocityXEach(0);
  groupObstacles.setLifetimeEach(-1);
  groupClouds.setLifetimeEach(-1);
  dino.changeAnimation("collided",collideImage);
  if(touches.length>0 || keyDown("space")){
    reset();
    touches=[];
  }
  
}
dino.collide(invisGround);
  drawSprites();
  
  

}



function spawnCloud(){

if(frameCount%60===0){
  cloud=createSprite(width+20,height-300,55,24);
  cloud.addImage(cloudImage);
  cloud.velocityX=-2;
  cloud.y=Math.round(random(105,160));
  cloud.scale=0.7;
  cloud.depth=dino.depth;
  dino.depth=dino.depth+1;
  cloud.lifetime=300;
groupClouds.add(cloud);
}
}
function spawnObstacles(){
  if(frameCount%70===0){
  var cactus=createSprite(width+20,height-25,20,20);
  cactus.velocityX=-10;
  var Random=Math.round(random(1,6));
  switch(Random){
    case 1: cactus.addImage(obstacle1);
    break;
    case 2: cactus.addImage(obstacle2);
    break;
    case 3: cactus.addImage(obstacle3);
    break;
    case 4: cactus.addImage(obstacle4);
    break;
    case 5: cactus.addImage(obstacle5);
    break;
    case 6: cactus.addImage(obstacle6);
    break;
    default: break;
  }
  cactus.scale=0.5;
  cactus.lifetime=460
  cactus.depth=dino.depth;
  dino.depth+=1;
  groupObstacles.add(cactus);
  }
}

function reset(){
  gamestate=PLAY 
  gameOver.visible=false;
  restart.visible=false;
  groupObstacles.destroyEach();
  groupClouds.destroyEach();
  score=0;
}