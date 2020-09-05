//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var lastFed;
var feedDog;
var addFood;
var fedTime;
var foodObj;
var Food;

function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  database=firebase.database();
  this.image=loadImage("images/dogImg.png")
  foodStock=database.ref('Food');
 foodStock.on("value",readStock);
 food1 = new food(200,400,10,10);
 feed=createButton("Feed the dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood=createButton("Add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFood);
  
}


function draw() {  
  background(46,139,87);
  fill(255,255,254);
  textSize(15);
  fedTime=database.ref('lastFed');
  
  fedTime.on("value", function(data){lastFed=data.val()});


  if(lastFed>=12){
    text("Last Feed : "+ lastFed %12 + "PM",350,30);
}else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
}else{
    text("Last Feed : "+ lastFed + "AM",350,30);
}



   dog.display();
   food1.display();
   feedDog();
   addFoods();

  }
  //drawSprites();
  //add styles here
  //textSize(20);
  fill("black");
  text("Note:Press UP_ARROW Key To Feed Drago Milk!",50 ,50);
  text("foodStock",250 ,270);

function readStock(data){
  foodS=data.val();
  
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
     Food:foodS
    })
  }
}



