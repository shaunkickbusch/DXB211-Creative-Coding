/*
* This sketch randomly generates shapes throughout the entirety of the screen
* Each shape is evenly spaced out and is either a square or a circle. This is randomly
* determined when the sketch is loaded and also when the user presses the regenerate
* button. Each shape is given a random colour and also a varying growth speed. The
* shapes slowly grow in size and once they hit a certain defined size they shrink back down.
* Additionally, the user can choose to click a shape, and if they do, the shape instantly
* halves in size and also changes colour.
* Shaun Kickbusch, n9962361
*/

//Global variables
let regenerateButton;
let MAX_SIZE = 45;
let shapeTypesString = ['Circle', 'Square'];
let shapeX = [];
let shapeY = [];
let shapeSize = [];
let shapeHue = [];
let shapeSaturation = [];
let shapeBrightness = [];
let shapeType = [];

//This function creates the shape's variables by adding them to the arrays
function createShape(x, y){

  append(shapeX, x);
  append(shapeY, y);
  append(shapeSize, random(10, 20));
  //Choosen a random string between Circle and Square
  append(shapeType, shapeTypesString[int(random(0, 2))]);
  append(shapeHue, random(0, 361));
  append(shapeBrightness, 100);
  append(shapeSaturation, 20);
}

//This function simply controls the growth of the shape and checks whether or not it's too large
function growShape(shapeIndex){
  //If the shape is equal to or greater than the max size
  if(shapeSize[shapeIndex] >= MAX_SIZE){
    //shrink the shape back down to a random smaller size
    shapeSize[shapeIndex] = random(0, 10);
    //Give the shape a different hue
    shapeHue[shapeIndex] = random(0, 361);
  }
  //Grow the shape a little
  shapeSize[shapeIndex] += 0.1;
}

//This function controls the shrinkage of the shape when the user clicks it
function shrinkShape(shapeIndex, mousePositionX, mousePositionY){

  //Create a variable that calculates if the mouse is currently in the area of a shape
  let area = dist(mousePositionX, mousePositionY, shapeX[shapeIndex], shapeY[shapeIndex]);
  //If the mouse is in a shapes array
  //Also set a minimum size that the shape can shrink to so it's always visible
  if(area < shapeSize[shapeIndex] && shapeSize[shapeIndex] > 5){
    //Create some visual feedback by changing the hue
    shapeHue[shapeIndex] = random(0, 361);
    //Make the colour 'pop'
    shapeSaturation[shapeIndex] = 100;
    //Divide it's size by 2
    shapeSize[shapeIndex] -= shapeSize[shapeIndex] / 2;
  }
}

//This function draws the shape
function displayShape(shapeIndex){
  //Set the fill of the shape
  fill(shapeHue[shapeIndex], shapeSaturation[shapeIndex], shapeBrightness[shapeIndex]);
  //If the shape is a circle we draw a circle
  if(shapeType[shapeIndex] === 'Circle'){
    circle(shapeX[shapeIndex], shapeY[shapeIndex], shapeSize[shapeIndex]);
  }
  //If the shape is a square we draw a square
  else if(shapeType[shapeIndex] === 'Square'){
    square(shapeX[shapeIndex], shapeY[shapeIndex], shapeSize[shapeIndex]);
  }
}

function setup(){

  createCanvas(800, 800);
  colorMode(HSB);
  //Ensure we draw our squares from the centre to avoid overlapping
  rectMode(CENTER);
  background(220);
  regenerateButton = createButton('Regenerate');
  //But the button in the middle of the screen
  regenerateButton.position(width / 2 - regenerateButton.width, 10);
  regenerateButton.mousePressed(regenerate);
  //Create the shapes
  createShapes();
}

function draw(){

  background(220);
  for (let i = 0; i < shapeX.length; i++){
    growShape(i);
    displayShape(i);
  }
}

function mousePressed(){

  for(let i = 0; i < shapeX.length; i++){
    shrinkShape(i, mouseX, mouseY);
  }
}

function createShapes(){

  //Iterates through the top of the canvas to the bottom creating the shapes with a 50 pixel space inbetween them
  for(let y = 75; y < 800; y += 50){
    for(let x = 50; x < 800; x += 50){
      //Add the individual shape to the array
      createShape(x, y);
    }
  }
}

//This function is called when the user clicks the regenerate button.
function regenerate(){
  //Clear the arrays
  shapeX = [];
  shapeY = [];
  shapeSize = [];
  shapeHue = [];
  shapeSaturation = [];
  shapeBrightness = [];
  shapeType = [];
  //Repopulate the array
  createShapes();
  //Redraw background to hide previous shapes
  background(220);
}
