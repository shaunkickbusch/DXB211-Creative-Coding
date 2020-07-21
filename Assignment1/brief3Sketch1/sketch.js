/*
* This sketch can be controlled by a variety of user input. The user can control a ninja sprite
* at the bottom of the screen by using the 'A' and 'D' keys to move left and right respectively.
* Additionally, the user can hold down space bar to make the ninja sprite slide, use left
* mouse to do an attack animation and use right mouse to do a throw animation. The user
* can also drag the mouse across the canvas to interact with the embers.
* Roberto Humpola n10146792, Shaun Kickbusch n9962361
* Recombination Effect 'FirePlace'
* Reference:
* Fire Pit: https://www.pexels.com/photo/night-fire-flame-fire-pit-21490/
* Smoke: https://docs.highfidelity.com/en/rc82/create/entities/create-fountain.html
* Ember: https://ya-webdesign.com/explore/fire-embers-png/
* Ninja Sprites: https://www.gameart2d.com/ninja-adventure---free-sprites.html
*/

let spriteRunRight = [];
let spriteRunLeft = [];
let spriteIdleLeft = [];
let spriteIdleRight = [];
let spriteAttackRight = [];
let spriteAttackLeft = [];
let spriteSlideLeft = [];
let spriteSlideRight = [];
let spriteThrowLeft = [];
let spriteThrowRight = [];
let frameNum;
let spriteX;
let spriteY;
let spriteXSpeed = 10;
let spriteYSpeed = 10;
let leftPressed = false;
let attacking = false;
let fire;
let smoke;
let ember;
let x = -1000;
let y = -1000;

function preload(){

  //Iterate through all the images and add them to their respective arrays
  for(let i = 0; i < 10; i++){
    spriteRunRight[i] = loadImage("pics/runRight/runRight" + i + ".png");
    spriteRunLeft[i] = loadImage("pics/runLeft/runLeft" + i + ".png");
    spriteIdleLeft[i] = loadImage("pics/idleLeft/idleLeft" + i + ".png");
    spriteIdleRight[i] = loadImage("pics/idleRight/idleRight" + i + ".png");
    spriteAttackRight[i] = loadImage("pics/attackRight/Attack__00" + i + ".png");
    spriteAttackLeft[i] = loadImage("pics/attackLeft/Attack__00" + i + ".png");
    spriteSlideLeft[i] = loadImage("pics/slideLeft/Slide__00" + i + ".png");
    spriteSlideRight[i] = loadImage("pics/slideRight/Slide__00" + i + ".png");
    spriteThrowLeft[i] = loadImage("pics/throwLeft/Throw__00" + i + ".png");
    spriteThrowRight[i] = loadImage("pics/throwRight/Throw__00" + i + ".png");
  }
  fire = loadImage("fire.jpg");
  smoke = loadImage("smoke.png");
  ember = loadImage("ember.png");
}

function setup(){

  createCanvas(1400, 800);
  image(fire, 0, 0);
  image(smoke,0, 0);
  image(ember,0, 0);
  //Ensure the ninja sprite spawns in the middle of the screen
  spriteX = width / 2;
  //Spawns the ninja sprite at the bottom of the canvas
  spriteY = height - 110;
  frameNum = 0;

  //Since our ninja sprite images were a fairly high resolution we can make them smaller by using the resize function
  for(let i = 0; i < 10; i++){
    //Divide each image's width and height by 4 to make to smaller
    spriteRunRight[i].resize(spriteRunRight[i].width / 4, spriteRunRight[i].height / 4);
    spriteRunLeft[i].resize(spriteRunLeft[i].width / 4, spriteRunLeft[i].height / 4);
    spriteIdleLeft[i].resize(spriteIdleLeft[i].width / 4, spriteIdleLeft[i].height / 4);
    spriteIdleRight[i].resize(spriteIdleRight[i].width / 4, spriteIdleRight[i].height / 4);
    spriteAttackRight[i].resize(spriteAttackRight[i].width / 4, spriteAttackRight[i].height / 4);
    spriteAttackLeft[i].resize(spriteAttackLeft[i].width / 4, spriteAttackLeft[i].height / 4);
    spriteSlideLeft[i].resize(spriteSlideLeft[i].width / 4, spriteSlideLeft[i].height / 4);
    spriteSlideRight[i].resize(spriteSlideRight[i].width / 4, spriteSlideRight[i].height / 4);
    spriteThrowLeft[i].resize(spriteThrowLeft[i].width / 4, spriteThrowLeft[i].height / 4);
    spriteThrowRight[i].resize(spriteThrowRight[i].width / 4, spriteThrowRight[i].height / 4);
  }
}

function draw(){
  //Increment frameNum so we can get an animation when the ninja sprite is moving/doing an action
  if(frameNum < 9){
    frameNum++;
  }
  else{
    frameNum = 0;
  }
  //Make our background the fire image behind everything, including the ninja sprite
  background(fire);

  //The 'A' key is pressed so run left
  if(keyIsDown(65)){
    //Check whether the sprite is within the left hand side boundary of the canvas
    if(spriteX > 0 + spriteRunLeft[0].width){
      spriteX -= spriteXSpeed;
    }
    //Set our bool to true because our last action was the left key
    leftPressed = true;
    image(spriteRunLeft[frameNum], spriteX, spriteY);
  }
  //The 'D' key is pressed so run right
  else if(keyIsDown(68)){
    //Check whether the sprite is within the right hand side boundary of the canvas
    if(spriteX < width - spriteRunRight[0].width){
      spriteX += spriteXSpeed;
    }
    //Our last action was moving the character right so we set the bool to false as left was not pressed
    leftPressed = false;
    image(spriteRunRight[frameNum], spriteX, spriteY);
  }
  //Space bar is pressed
  else if(keyIsDown(32)){
    //If we're in the bounds on the right hand side of the screen and our character is facing right
    if(spriteX < width - spriteSlideRight[0].width && leftPressed === false){
      //Increment because we're running to the right
      spriteX += spriteXSpeed;
      image(spriteSlideRight[frameNum], spriteX, spriteY + 25);
    }
    //If we're in the bounds on the left hand side of the screen and our character is facing left
    else if(spriteX > 0 + spriteSlideLeft[0].width && leftPressed === true){
      //Decrement because we're running to the left
      spriteX -= spriteXSpeed;
      image(spriteSlideLeft[frameNum], spriteX, spriteY + 25);
    }

  }
  //If we don't have keyboard input we may have mouse input
  else if(mouseIsPressed){
    //Left mouse will trigger the attack animation
    if (mouseButton === LEFT){
      //Our character is facing the right
      if(leftPressed === false){
        image(spriteAttackRight[frameNum], spriteX, spriteY);
      }
      //Our character is facing the left
      else if(leftPressed === true){
        image(spriteAttackLeft[frameNum], spriteX, spriteY);
      }
    }
    //Left mouse will trigger the throw animation
    if (mouseButton === RIGHT){
      //Our character is facing the right
      if(leftPressed === false){
        image(spriteThrowRight[frameNum], spriteX, spriteY);
      }
      //Our character is facing the left
      else if(leftPressed === true){
        image(spriteThrowLeft[frameNum], spriteX, spriteY);
      }
    }

  }
  //If we've got no valid keyboard or mouse inputs our character is idle and will play the idle animation
  else{
    //If our character if facing the left
    if(leftPressed === true){
      image(spriteIdleLeft[frameNum], spriteX, spriteY);
    }
    //If our character if facing the right
    else if(leftPressed === false){
      image(spriteIdleRight[frameNum], spriteX, spriteY);
    }
  }
  //Map the left hand side of the screen to the right hand of the screen, to the range -20 to 50
  let mouseInput = map(mouseX, 0, width, -20, 50);
  //Draw the ember image, give it a bit of jitter and + the mouseInput to make some interactivity
  image(ember, random(-1, 1) + mouseInput, 0);
  image(smoke, x, y, 5000, 5000);
  //Make the y move upwards so our smoke can move
  y = y - 1;
  //Give the smoke some jitter
  x = x + random(-0.5, 0.5);
  //Since the smoke if flowing upwards, if it goes too far off the screen it resets
  if (y < -4850){
    y = height;
 }
}
