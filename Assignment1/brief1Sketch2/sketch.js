/*
* As this is my first attempt at a sketch, I originally kept it simple.
* I originally had a static dart board target and when the mouse was pressed a green circle,
* reminiscent of a dart, would appear on the board. However Shaun suggested some improvements,
* namely changing the sketch into a sort of mini game. The user controls a 'hand' at the bottom
* of the board using the left and right mouse buttons. When the middle mouse button is pressed
* a 'dart' is launched speeding up the canvas. If the 'dart' hits the board, which respawns in
* a new position every 5 seconds, they are randomly scored with an outter ring, an inner ring or
* a bullseye.
* Stewart fleming n10396501, Shaun Kickbusch n9962361
*/

//Global variables
let handX;
let handY;
let handSpeed;
let handSize;
let hand;
let timer;
let targetSpawnYPosition;
let randXSpawnPosition;
let bulletWidth;;
let bulletHeight;
let myBulletsX = [];
let myBulletsY = [];
let myBulletsXSpeed = [];
let myBulletsYSpeed = [];
let numBullets;
let score;
let outterRingSize;
let innerRingSize;
let bullseyeSize;
let targetHitString;

function setup(){

  createCanvas(1400, 800);
  background(0);
  //Ensures the darts fire from the center of the hand
  rectMode(CENTER);
  //Initialise the global variables
  handSpeed = 70;
  handSize = 40;
  targetSpawnYPosition = 200;
  timer = 5;
  //Ensure the hand spawns in the center of the screen
  handX = width / 2;
  handY = height - 100;
  numBullets = 0;
  score = 0;
  outterRingSize = 250;
  innerRingSize = 180;
  bullseyeSize = 80;
  bulletHeight = 40;
  bulletWidth = 15;
  //Give the target a random spawn as soon as the sketch starts
  randXSpawnPosition = random(250 / 2 + 10, width - 250 / 2 - 10);
  //Draw the target
  drawTarget();
}

//This function draws 3 circles to illustrate a typical dart board with an outter ring, innner ring and bullseye
function drawTarget(){

  fill("BLUE");
  circle(randXSpawnPosition, targetSpawnYPosition, outterRingSize);
  fill("WHITE");
  circle(randXSpawnPosition, targetSpawnYPosition, innerRingSize);
  fill("RED");
  circle(randXSpawnPosition, targetSpawnYPosition, bullseyeSize);
  fill("WHITE");
}

function createBullet(){
  //Populate the arrays that relate to the bullet
  append(myBulletsX, handX);
  append(myBulletsY, handY);
  append(myBulletsXSpeed, 0);
  //Set the Y speed to -10 to ensure it's moving towards the top of the screen
  append(myBulletsYSpeed, -10);
}

function displayBullets(bulletNum){

  fill("GREEN");
  //Draw the bullet
  rect(myBulletsX[bulletNum], myBulletsY[bulletNum], bulletWidth, bulletHeight);
  fill(255);
}

function moveBullets(bulletNum){
  //Increment the bullet's x and y position with the respective speed
  myBulletsX[bulletNum] += myBulletsXSpeed[bulletNum];
  myBulletsY[bulletNum] += myBulletsYSpeed[bulletNum];

  let hasCollided = bulletTargetCollision(randXSpawnPosition, targetSpawnYPosition, myBulletsX[bulletNum], myBulletsY[bulletNum]);
  //If hasCollided is true then we know the bullet has hit the target
  if(hasCollided === true){

    //Remove that specific bullet from the arrays since we don't need it to be visible anymore as it hit the target
    myBulletsX.splice(bulletNum, 1);
    myBulletsY.splice(bulletNum, 1);
    myBulletsXSpeed.splice(bulletNum, 1);
    myBulletsYSpeed.splice(bulletNum, 1);
    //Decrement the total ammount of bullets
    numBullets--;
    //Generate a random value which represents whether we hit the outter ring, inner ring or bullseye
    let randTargetValue = int(random(0, 3));
    if(randTargetValue === 0){
      score += 10;
      targetHitString = "YOU HIT THE OUTTER RING!";
    }
    else if(randTargetValue === 1){
      score += 20;
      targetHitString = "YOU HIT THE INNER RING!";
    }
    else if(randTargetValue === 2){
      score += 50;
      targetHitString = "YOU HIT THE BULLSEYE!";
    }
  }
}

//This is the collision function which checks whether or not the bullet has come into contact with the target
function bulletTargetCollision(targetX, targetY, bulletX, bulletY){

  let testX = bulletX;
  let testY = bulletY;

  //Test the top of the bullet
  if (targetY < bulletY){
    testY = bulletY;
  }
  //Test the left of the bullet
  else if (targetX < bulletX){
    testX = bulletX;
  }
  //Test the right of the bullet
  else if (targetX > bulletX + bulletWidth){
    testX = bulletX + bulletWidth;
  }
  //Check to see if the bullet is in the target's vacinity. We divide the outter ring size by 2 to get the radius
  if (dist(targetX, targetY, testX, testY) <= outterRingSize / 2) {
    return true;
  }
  else{
    return false;
  }

}

//Simple helper function to draw the bullets on the screen and move them
function drawBullets(){
  for (let i = 0; i < numBullets; i++) {
    displayBullets(i);
    moveBullets(i);
  }
}

//The clock function which keeps track of how many seconds have passed
function clock(){
  //Since the framerate is 60, we can make a clock that uses mod 60 to check if a second has passed
  if (frameCount % 60 == 0 && timer > 0){
    timer--;
  }
  //When the timer's up
  if (timer === 0){
    background(0);
    //Since the timer's up we place the target into a new position
    randXSpawnPosition = random(250 / 2 + 10, width - 250 / 2 - 10);
    //Reset the timer back
    timer = 5;
  }
}

function draw(){
  //Redraw the background so we don't get ghosting
  background(0);
  //Redraw the target because we just reset the background
  drawTarget();
  //Redraw the bullets because we just reset the background
  drawBullets();
  //Redraw the hand because we just reset the background
  hand = square(handX, handY, handSize, handSize);
  //Set colour to white
  fill(255);
  textSize(25);
  text("Target respawning in: " + timer, 20, 30);
  //Calculate the width of that specific text, if drawn, so we can easily offset and place it into the center
  let scoreTextWidth = textWidth("Score: " + score);
  text("Score: " + score, width - scoreTextWidth - 50, 30);
  let targetHitTextWidth = textWidth(targetHitString);
  text(targetHitString, width / 2 - targetHitTextWidth / 2, 30);
  //Do all the timer specific code
  clock();
}

//Simple mousePressed function which is inherently called whenever a mouse button is pressed
function mousePressed(){
  //The > handSize * 3 simply ensures there's a boundary at the left hand side of the canvas so the user can't move the 'hand' outside the canvas
  if (mouseButton === LEFT && handX > handSize * 3){
    handX -= handSpeed;
  }
  //The < width - handSize * 3 simply ensures there's a boundary at the right hand side of the canvas so the user can't move the 'hand' outside the canvas
  if (mouseButton === RIGHT && handX < width - handSize * 3){
    handX += handSpeed;
  }
  if (mouseButton === CENTER){
    numBullets++;
    createBullet();
  }
}
