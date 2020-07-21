/*This sketch was inspired by the inclass animation tutorial, I wanted to create a flip book style animation,I hand sketched the images for this sketch.
stewart fleming n10396501*/



let runFrames = [];
let frameNum = 0;

function preload() {
// loads the images for the animation//
  runFrames[0] = loadImage("bomb/bomb1.png");
  runFrames[1] = loadImage("bomb/bomb2.png");
  runFrames[2] = loadImage("bomb/bomb3.png");
  runFrames[3] = loadImage("bomb/bomb4.png");
  runFrames[4] = loadImage("bomb/bomb5.png");
  runFrames[5] = loadImage("bomb/bomb6.png");
  runFrames[6] = loadImage("bomb/bomb7.png");
  runFrames[7] = loadImage("bomb/bomb8.png");
  runFrames[8] = loadImage("bomb/bomb9.png");
  runFrames[9] = loadImage("bomb/bomb10.png");
  runFrames[10] = loadImage("bomb/bomb11.png");
  runFrames[11] = loadImage("bomb/bomb12.png");
  runFrames[12] = loadImage("bomb/bomb13.png");
  runFrames[13] = loadImage("bomb/bomb14.png");
  runFrames[14] = loadImage("bomb/bomb15.png");
  runFrames[15] = loadImage("bomb/bomb16.png");
  runFrames[16] = loadImage("bomb/bomb17.png");
  runFrames[17] = loadImage("bomb/bomb18.png");
  runFrames[18] = loadImage("bomb/bomb19.png");
  runFrames[19] = loadImage("bomb/bomb20.png");



}


function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  frameNum = 0;
}

function draw() {
  background(250);
  //using if mouse is pressed to add some interaction, clicking    will cycle 1 frame at a time or holding the mouse will run the animation//

  if (mouseIsPressed) {
    frameNum += 0.08
    if (frameNum >= 20) {
      frameNum = 0;
    }
  }
  //changed the scale to give the appearance of  drawing in the corner of the page//
  scale(.5);
  image(runFrames[floor(frameNum)], 500, 500);
  //changing the line color to blue to give the appearance of a lined book//
  stroke("BLUE");
 
  for (lineY = 40; lineY <= 400; lineY += 20) {
    line(0, lineY * 2, width * 3, lineY * 2);
  }




}