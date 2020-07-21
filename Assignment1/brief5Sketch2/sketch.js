/* This sketch features characters which fall from the top of the screen. The characters
 * make out the word "rain." You can move your mouse around to control an umbrella. If
 * a letter and the umbrella collide the transperency of that letter changes and respawns
 * at the top of the screen. If a letter makes it to the bottom of the screen it also
 * respawns at the top of the screen without any transparency.
 * Roberto Humpola n10146792, Shaun Kickbusch n9962361
 * References:
 * https://toppng.com/umbrella-clipart-black-and-white-outline-pictures-of-umbrella-PNG-free-PNG-Images_222530?search-result=earth-logo-white
 * https://p5js.org/examples/objects-objects.html
 * https://github.com/bmoren/p5.collide2D#colliderectcircle
 */

let myFontSize = 20;
let rainCharacters = ['r', 'a', 'i', 'n'];
let myText = [];
let myTextY = [];
let myTextX = [];
let myTextVelocityY = [];
let myTextVelocityX = [];
let rainFont;
let umbrellaImage;
let umbrellaWidth;
let umbrellaHeight;
let umbrellaX;
let umbrellaY;
let myUmbrella;
let numDroplets;
let rainColour = [];

function preload() {

  rainFont = loadFont("RAINYDAYS.ttf");
  umbrellaImage = loadImage("umbrella.png");
}

function setup() {

  createCanvas(1400, 600);
  colorMode(RGB);
  //Set the bg to pink
  background(211, 24, 105);
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  numDroplets = 100;
  //Shrink the image
  umbrellaWidth = umbrellaImage.width / 3;
  umbrellaHeight = umbrellaImage.height / 3;
  umbrellaImage.resize(umbrellaWidth, umbrellaHeight);
  umbrellaX = mouseX;
  umbrellaY = mouseY;
  textSize(myFontSize);
  textFont(rainFont)
  noStroke();
  let randCharacter = 0;
  //Create the letters
  for (let i = 0; i < numDroplets; i++) {

    //If randCharacter is greater than 3, set randCharacter to 0 else increment it
    randCharacter > 3 ? randCharacter = 0 : randCharacter++;
    myText[i] = rainCharacters[randCharacter];
    myTextY[i] = random(0, height / 2);
    //Space the letters out evenly
    myTextX[i] = i * 20;
    myTextVelocityY[i] = random(0.8, 1.5);
    myTextVelocityX[i] = random(0.8, 1.5);
    rainColour[i] = color('rgba(255, 255, 255, 1)');
  }
}

function draw() {

  background(211, 24, 105);

  for (let i = 0; i < numDroplets; i++){

    fill(rainColour[i]);
    text(myText[i], myTextX[i], myTextY[i]);
    //If the text hits the bottom in spawns back up to the top and changes it's alpha back to full
    if (myTextY[i] >= height + myFontSize){

      myTextY[i] = random(0, height / 2);
      rainColour[i] = color('rgba(255, 255, 255, 1)');
    }
    //Get the width in pixels of the letter
    let myTextWidth = textWidth(myText[i]);
    //See if the text has collided with the umbrella
    if (hasTextUmbrellaCollided(myTextX[i], myTextY[i], myTextWidth, 10, umbrellaX, umbrellaY, umbrellaWidth) === true) {

      rainColour[i] = color('rgba(255, 255, 255, 0.5)');
      myTextY[i] = random(0, height / 2);
    }

    myTextY[i] += myTextVelocityY[i];
    //Give letter jiggle
    myTextX[i] += random(-myTextVelocityX[i], myTextVelocityX[i]);
  }
  //Ensure the umbrella can't leave the screen
  umbrellaX = constrain(mouseX, umbrellaWidth / 2, width - umbrellaWidth / 2);
  umbrellaY = constrain(mouseY, umbrellaHeight / 2, height - umbrellaHeight / 2);
  //Draw the umbrella
  image(umbrellaImage, umbrellaX, umbrellaY);
}

/*
 * This function was taken from the p5.js 2D collision library and detects collision
 * between the letter and the umbrella.
*/
function hasTextUmbrellaCollided(textX, textY, textWidth, textHeight, umbrellaX, umbrellaY, umbrellaDiameter){

  let testX = umbrellaX;
  let testY = umbrellaY;

  //Left hand side of the letter
  if (umbrellaX < textX) {
    testX = textX;
  }
  //Right hand side of the letter
  else if (umbrellaX > textX + textWidth) {
    testX = textX + textWidth;
  }
  //top of the letter
  if (umbrellaY < textY) {
    testY = textY;
  }
  //Bottom of the letter
  else if (umbrellaY > textY + textHeight) {
    testY = textY + textHeight;
  }

  //get distance from closest edges
  let distance = this.dist(umbrellaX, umbrellaY, testX, testY)

  // if the distance is less than the radius, collision!
  if(distance <= umbrellaDiameter / 2){
    
    return true;
  }
  else{

    return false;
  }
}
