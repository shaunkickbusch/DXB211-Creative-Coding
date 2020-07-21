/*
* This is a bouncy ball sketch which has balls that bounce around the canvas
* Each ball has a random speed on the x and y axis and moves accordingly.
* When the balls hit the edge of the canvas they bounce off with a new trajectory
* The balls also spawn with a random colour, and each time they bounce off the edge
* of the canvas it once again takes a random colour. Additionally, if the user presses
* a mouse button another ball spawns at the mouse's X and Y position.
* Shaun Kickbusch, n9962361
* Inspiration was drawn from the following example: https://p5js.org/examples/motion-bouncy-bubbles.html
* This example was modified heavily by using arrays to store a ball's data instead of an object.
* Each ball can be represented by a unique index in each of the arrays.
*/

let numBalls = 15;
let myBallsSize = [];
let myBallsX = [];
let myBallsY = [];
let myBallsRedValue = [];
let myBallsGreenValue = [];
let myBallsBlueValue = [];
let myBallsSpeedX = [];
let myBallsSpeedY = [];

//This function simply generates a random colour by storing the red, green and blue values into their own arrays.
function genRandColour(ballNum){
  myBallsRedValue[ballNum] = random(50,255);
  myBallsGreenValue[ballNum] = random(50,255);
  myBallsBlueValue[ballNum] = random(50,255);
}

/*
* This function creates a ball by using the ballNum parameter to denote an index.
* The mouseX and mouseY variables are giving a default value so we can detect
* whether or not it has changed through manual user input
*/
function createBall(ballNum, mouseX = 0, mouseY = 0){
    //Give the ball a random size
    append(myBallsSize, random(20, 60));

    //If the mouseX and mouseY are 0, we know we have the default values therefore the user didn't click and these are for the initial setup
    if(mouseX === 0 && mouseY === 0){
      append(myBallsX, random(myBallsSize[ballNum], width - myBallsSize[ballNum]));
      append(myBallsY, random(myBallsSize[ballNum], height - myBallsSize[ballNum]));
    }
    //If the values aren't equal to 0 we know the user has triggered the mousePressed event
    else if(mouseX != 0 && mouseY != 0){
      append(myBallsX, mouseX);
      append(myBallsY, mouseY);
    }
    //Store the ball's colour and speed in the arrays
    append(myBallsRedValue, random(50,255));
    append(myBallsGreenValue, random(50,255));
    append(myBallsBlueValue, random(50,255));
    append(myBallsSpeedX, random(-5, 10));
    append(myBallsSpeedY, random(-5, 10));

}

//Helper function to draw the balls and move them
function drawBalls(){
  for (let i = 0; i < numBalls; i++) {
    displayBalls(i);
    moveBalls(i);
  }
}

/*
* Function which draws the ball. It does this on an individual basis by
* taking ballNum as a parameter. ballNum represents the balls position in the arrays
*/
function displayBalls(ballNum){
    //Set the line width
    strokeWeight(2);
    //Set stroke to white
    stroke(255);
    //Draw a line from the ball to the centre of the canvas
    line(myBallsX[ballNum], myBallsY[ballNum], width / 2, height / 2);
    strokeWeight(5);
    //Set the fill to a random RGB colour
    fill(myBallsRedValue[ballNum], myBallsGreenValue[ballNum], myBallsBlueValue[ballNum]);
    //Draw the circle
    ellipse(myBallsX[ballNum], myBallsY[ballNum], myBallsSize[ballNum] * 2, myBallsSize[ballNum] * 2);

}

/*
* Function which controls the movement of the ball. It does this on an individual basis by
* taking ballNum as a parameter. ballNum represents the balls position in the arrays
*/
function moveBalls(ballNum){
  //change the ball's x and y position by incrementing it with the speed
  myBallsX[ballNum] += myBallsSpeedX[ballNum];
  myBallsY[ballNum] += myBallsSpeedY[ballNum];
  //If the ball comes into contact with right hand size of the screen or the ball comes into contact with the left hand side of the screen
  if (myBallsX[ballNum] > width - myBallsSize[ballNum] || myBallsX[ballNum] < myBallsSize[ballNum]){
    //Give the ball a negative trajectory so it 'bounces' off
    myBallsSpeedX[ballNum] = -myBallsSpeedX[ballNum];
    //Give the ball a new colour if it hits the canvas' x boundary
    genRandColour(ballNum);
  }
  //If the ball hits the bottom of the screen or the ball hits the top of the screen
  if (myBallsY[ballNum] > height - myBallsSize[ballNum] || myBallsY[ballNum] < myBallsSize[ballNum]){
    //Give the ball a negative trajectory so it 'bounces' off
    myBallsSpeedY[ballNum] = -myBallsSpeedY[ballNum];
    //Give the ball a new colour if it hits the canvas' y boundary
    genRandColour(ballNum);
  }
}

//Create a new ball where the user has clicked
function mousePressed(){
  //Create a ball at the mouse's X position and Y position
  createBall(numBalls, mouseX, mouseY);
  //Increment the amount of total balls we have on screen to ensure our total index is consistent
  numBalls += 1;
}

function setup(){

  colorMode(RGB);
  createCanvas(1200, 800);
  //Create 15 balls as soon as the sketch is loaded
  for (let i = 0; i < numBalls; i++){
    createBall(i);
  }
}

function draw(){
  //Redrawn the background so we don't get any ghosting from the ball's previous positon
  background(0);
  drawBalls();
}
