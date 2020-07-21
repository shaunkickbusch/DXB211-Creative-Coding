/*
 * This sketch is show cases the text "NEON" in the middle of the screen. It uses a
 * neon font and is also a neon colour. The neon colour is chosen at random when the sketch
 * is first initially loaded. Behind the sketch are a bunch of flying particles. These
 * particles are also a random neon colour and bounce off the edges of the canvas and
 * also the "NEON" text. Every time one of the particles comes into contact with the
 * text it causes the "NEON" text to change to another random neon colour. Additionally,
 * when the particles come within a short distance of each other a line forms joining them.
 * Every time the milliseconds surpassed is divisible by 15 the lines, connecting the
 * dots also changes to another random colour. Also you can use the mouse buttons to change
 * the colour of the "NEON" font and the lines connecting the particles.
 * Shaun Kickbusch, n9962361
 * Inspiration:
 * https://p5js.org/examples/simulate-particles.html
 */

let neonFont;
let randColour;
let colours = ['#4deeea', '#74ee15' , '#ffe700', '#f000ff', '#001eff'];
let particleX = [];
let particleY = [];
let particleSize = [];
let particleVelocityX = [];
let particleVelocityY = [];
let particleColour = [];
let randLineColour;
let numParticles;
let myPoints;
let myFontSize = 300;
let myTextWidth;

function preload(){
  neonFont = loadFont("data/Neon.ttf");
}

function setup(){

  createCanvas(1200, 600);
  background(0);
  textSize(myFontSize);
  textFont(neonFont);
  randColour = colours[int(random(0, 5))];
  myTextWidth = textWidth("NEON");
  //This stores all the objects which contain the x and y position of the pixels which create the font
  myPoints = neonFont.textToPoints("NEON", (width - myTextWidth) / 2, height / 2, myFontSize);
  //Create a random number of particles
  numParticles = random(30, 50);
  //Create all the variables for all the particles
  for(let i = 0; i < numParticles; i++){
    createParticle(i);
  }
}

function draw(){

  background(0);
  //flooring the milliseconds ensures we've got a whole number
  let ms = floor(millis());
  fill(color(randColour));
  text("NEON", (width - myTextWidth) / 2, height / 2);

  for(let i = 0; i < numParticles; i++){
    //Change the colour of the lines that connect the particles every 15 milliseconds
    if(ms % 15 === 0){
       randLineColour = colours[int(random(0, 5))];
    }
    drawParticleLines(i, randLineColour);
    moveParticle(i);
    particleFontCollision(i);
    drawParticle(i);
  }
}

//This function creates the variables needed for the particle
function createParticle(myIndex){

  append(particleX, random(0, 250));
  append(particleY, random(height));
  append(particleVelocityX, random(-2, 2));
  append(particleVelocityY, random(-2, 2));
  //Choose a random neon colour string
  append(particleColour, colours[int(random(0, 5))]);
  append(particleSize, 10);
}

//Draws the particle on the screen
function drawParticle(myIndex){

  noStroke();
  fill(color(particleColour[myIndex]));
  circle(particleX[myIndex], particleY[myIndex], particleSize[myIndex]);
}

/*
Moves the particle by incrementing the x and y position. This function also check
whether or not the particle has hit the canvas' boundaries.
*/
function moveParticle(myIndex){

  particleX[myIndex] += particleVelocityX[myIndex];
  particleY[myIndex] += particleVelocityY[myIndex];

  if(particleX[myIndex] < 0 || particleX[myIndex] >= width){
    particleVelocityX[myIndex] *= -1;
  }

  if(particleY[myIndex] < 0 || particleY[myIndex] > height){
    particleVelocityY[myIndex] *= -1;
  }
}

/*
Moves the particle by incrementing the x and y position. This function also check
whether or not the particle has hit the canvas' boundaries.
*/
function drawParticleLines(myIndex, myColour = color(255)){
  //For loop to iterate through all the particles in front of the current one
  for(let i = myIndex + 1; i < numParticles; i++){
    //Get the distance between the current particle and the other particles
    let dis = dist(particleX[myIndex], particleY[myIndex], particleX[i], particleY[i]);
    //If the distance between the current particle and the other is is less than 80, they're close
    if(dis < 80){

      strokeWeight(2);
      stroke(myColour);
      line(particleX[myIndex], particleY[myIndex], particleX[i], particleY[i]);
    }
  }
}

//Change the colour of the text and the particle connecting lines when the mouse is pressed
function mousePressed(){

  randColour = colours[int(random(0, 5))];
  randLineColour = colours[int(random(0, 5))];
}

//Check to see if the particle has collided with any of the pixels which make up the "NEON" font
function particleFontCollision(particleIndex){
  //Iterate through all the pixel objects
  for(let i = 0; i < myPoints.length; i++){
    //Grab the x and the y from the pixel object and see if it matches the particles coodinates
    if(collidePointCircle(myPoints[i].x, myPoints[i].y, particleIndex) === true){
      //Ensure the particle bounces off the text
      particleVelocityX[particleIndex] *= -1;
      particleVelocityY[particleIndex] *= -1;
      //Give the text a different colour
      randColour = colours[int(random(0, 5))];
    }
  }
}

//Takes an x and the y position of a pixel that makes up the font and returns true if the particle has collided with it
function collidePointCircle(fontX, fontY, myIndex){

  let myDistance = dist(fontX, fontY, particleX[myIndex], particleY[myIndex]);
  if(myDistance <= particleSize[myIndex]){
    return true;
  }
  else{
    return false;
  }
}
