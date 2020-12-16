//Create variables here
var dog , happyDog;
var dogImg , happyDogImg ;
var database;
var foodS , foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
 dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500 , 500);
  
  dog = createSprite(400 , 250, 10 , 10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() {  
background(46 , 139 , 87);

if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogHappy);
}

  drawSprites();
  //add styles here

  textSize(20);
  fill ("black");
  stroke("black");
  text("food remaining  " + foodS  , 250 , 40);

  text("press up arrow to feed your pet" , 200 , 440);
  
  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if(x<=0){
  x = 0;
}else{
  x = x-1;
}

  database.ref('/').update({
    food:x
  })
}


