var GO_I
var GO
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 GO_I = loadImage("game over.jfif")

}


function setup() {
   createCanvas(600, 300);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(50,200,10,10)
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  GO = createSprite(300,150,600,400)
  GO.visible = false;
  GO.scale = 2
  GO.addImage(GO_I)
  ground = createSprite(400,290, 2100,10);
  ground.velocityX=-4;

  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  } 
  
  
   if (gameState ===PLAY){
    
    monkey.velocityY = monkey.velocityY + 0.8;
   textSize(20);
  fill("Gold");
   survivalTime=  Math.round(frameCount/30);
  text("Survival Time: "+ survivalTime, 100,50);
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
  
     if(keyDown("space")){
      monkey.velocityY = -8;
    }
   }
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("Gold");
  text("Score: "+ score, 500,50);        
  
  if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
       
    gameState=END
    
    }
  if(FoodGroup.isTouching(monkey)){
       score = score + 1;
      FoodGroup.destroyEach();
  }

if(gameState === END){
  survivalTime.visible = true;
   survivalTime = survivalTime - Math.round(frameCount/3000000000000000000000000000000000000000);
  text("Survival Time: "+ survivalTime, 100,50);
   GO.addImage(GO_I)
  GO.visible = true

 

 
 
  
  
 }
 
   
}
  




function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 50 === 0) {
    banana = createSprite(600,150,40,10);
    banana.y = random(100,260); 
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    obstacle = createSprite(600,270,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.debug = true
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    obstacle.setCollider("rectangle",0,0,40,40);
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
