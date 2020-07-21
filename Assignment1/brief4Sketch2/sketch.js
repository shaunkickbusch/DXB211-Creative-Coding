/*
 * I took the inspiration from these examples:
 * https://p5js.org/examples/sound-playback-rate.html
 * https://p5js.org/examples/sound-measuring-amplitude.html
 * and wanted to combine the over all effects and add some visual stimulation aswell,
 * I tried to create a kind of colorful explosion that increases with the speed of the sound.
 * Stewart Fleming, n10396501
 */

let mySound;
let r;
let g;
let b;
let a;

function preload() {
  mySound = loadSound("swish_3.wav");
}

function setup() {

  createCanvas(400, 400);
  //analyzer from the example
  mySound.loop()
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySound);
}

//Implemented this into a function to save repetative code
function drawRectangle(myX, myY, mySize, myIndex){
  fill(r, g, b, a);

}

function draw(){

  background(0);
  //random color filled rectangles act as a color wall
  r = random(255);
  g = random(100, 200);
  b = random(100);
  a = random(140);

  let size = analyzer.getLevel();

  stroke(0);
  fill(r, g, b, a);
  rectMode(CENTER);
  rect(0, 0, size * 800, size * 800);
  rect(400, 400, size * 800, size * 800);
  rect(400, 0, size * 800, size * 800);
  rect(0, 400, size * 800, size * 800);
  rect(200, 200, size * 800, size * 800);
  rect(200, 0, size * 800, size * 800);
  rect(0, 200, size * 800, size * 800);
  rect(400, 200, size * 800, size * 800);
  rect(200, 400, size * 800, size * 800);
  /*
   * this element is a color speed adjuster that pulses with the
   * sample rate and changes the speed of the track as it is moved up
   * and down, again there is probably a way to do this as a for loop
   * but I couldn't get it to work
  */
  fill(235, 22, 219);
  circle(mouseX, mouseY, size * 500);

  fill(235, 229, 23);
  circle(mouseX + 40, mouseY + 40, size * 200);

  fill(255, 44, 28);
  circle(mouseX + 40, mouseY - 40, size * 200);

  fill(30, 72, 255);
  circle(mouseX - 40, mouseY + 40, size * 200);

  fill(15, 255, 48);
  circle(mouseX - 40, mouseY - 40, size * 200);

  //the speed map from the example
  let speed = map(mouseY, 2, height, 0, 3);
  speed = constrain(speed, 0.5, 3);
  mySound.rate(speed);
}
