/*
  * This sketch is a simple shape interaction program. At the top of the canvas are 5 buttons
  * each of which represent a different shape. When pressed they draw the respective shape
  * in a random spot on the canvas. The shapes also appear as random colours. In the bottom
  * right of the canvas is a clear button which when pressed, 'removes' all the shapes
  * from the canvas.
  * Shaun Kickbusch, n9962361
 */


let padding = 150;
let paddingTop = 70;
let squareButton;
let rectangleButton;
let circleButton;
let ellipseButton;
let triangleButton;
let clearButton;

function setup(){

    createCanvas(1200, 800);
    background(0);
    colorMode(RGB);

    //Create the buttons
    squareButton = createButton('Square');
    rectangleButton = createButton('Rectangle');
    circleButton = createButton('Circle');
    ellipseButton = createButton('Ellipse');
    triangleButton = createButton('Triangle');
    clearButton = createButton('Clear');

    squareButton.position(padding, 20);
    //gets the x position of the previous button + the length of the previous button + padding to ensure each button is spaced out evenly.
    rectangleButton.position(padding + squareButton.position().x + squareButton.width, 20);
    circleButton.position(padding + rectangleButton.position().x + rectangleButton.width, 20);
    ellipseButton.position(padding + circleButton.position().x + circleButton.width, 20);
    triangleButton.position(padding + ellipseButton.position().x + ellipseButton.width, 20);
    clearButton.position(width - padding - clearButton.width, height - paddingTop - clearButton.height);

    //Event listeners for the buttons
    squareButton.mousePressed(drawSquare);
    rectangleButton.mousePressed(drawRectangle);
    circleButton.mousePressed(drawCircle);
    ellipseButton.mousePressed(drawEllipse);
    triangleButton.mousePressed(drawTriangle);
    clearButton.mousePressed(clearCanvas);
  }

function draw(){

}

//This function repaints the background onto the canvas giving the illusion that the shapes are all cleared
function clearCanvas(){
  background(0);
}

//This function draws a square with a random size in a random spot on the canvas with a random colour
function drawSquare(){
  let randSize = random(30, 60);
  let randX = random(padding, width - randSize - padding);
  let randY = random(paddingTop, height - randSize - padding);
  randColour();
  square(randX, randY, randSize);
}

//This function draws a rectangle with a random size in a random spot on the canvas with a random colour
function drawRectangle(){
  let randSizeWidth = random(30, 100);
  let randSizeHeight = random(30, 100);
  let randX = random(padding, width - randSizeWidth - padding);
  let randY = random(paddingTop, height - randSizeHeight - padding);
  randColour();
  rect(randX, randY, randSizeWidth, randSizeHeight);
}

//This function draws a cricle with a random size in a random spot on the canvas with a random colour
function drawCircle(){
  let randSize = random(30, 60);
  let randX = random(padding, width - randSize - padding);
  let randY = random(randSize + paddingTop, height - randSize - padding);
  randColour();
  circle(randX, randY, randSize);
 }

//This function draws a ellipse with a random size in a random spot on the canvas with a random colour
function drawEllipse(){
  let randSizeWidth = random(30, 100);
  let randSizeHeight = random(30, 100);
  let randX = random(padding, width - randSizeWidth - padding);
  let randY = random(randSizeHeight + paddingTop, height - randSizeHeight - padding);
  randColour();
  ellipse(randX, randY, randSizeWidth, randSizeHeight);
 }

//This function draws a triangle with a random size in a random spot on the canvas with a random colour
function drawTriangle(){
  //we take away padding * 2 to account for the triangle's base's length
  let randX1 = random(padding, width - padding * 2);
  //Make triangle a minimum of 10 long to 20
  let randX3 = random(randX1 + 30, randX1 + 30 + 70);
  //Find the middle between the 2 points
  let randX2 = (randX3 + randX1) / 2;
  let randY1 = random(paddingTop + (randX3 - randX1), height - padding);
  let randY3 = randY1;
  let randY2 = randY1 - (randX3 - randX1);
  randColour();
  triangle(randX1, randY1, randX2, randY2, randX3, randY3);
 }

/*
This function is called throughout the draw shape functions to create a random colour.
Implementing this into a function allows the reduction of redundant code
*/
 function randColour(){
   let red = random(50, 255);
   let green =  random(50, 255);
   let blue = random(50, 255);
   fill(red, green, blue);
 }
