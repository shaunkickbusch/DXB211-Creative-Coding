/*
 * Musical Images: 'Neon Lights'
 * This sketch features 10 balls which bounce around the screen. In the background
 * there's a soundtrack playing and the balls contract and expand in size in respect to
 * the audio's amplitude. The balls bounce off of the edges of the screen and also each other.
 * Additionally, they change colour as they.
 * Roberto Humpola n10146792
 * Reference:
 * Mp3 file: https://opengameart.org/content/gothic-horror-symphonic-waltz
 * Code for ellipse: https://p5js.org/examples/sound-measuring-amplitude.html
 * Inspiration from: https://p5js.org/examples/motion-bouncy-bubbles.html
 */

let numBalls = 20;
let bounceOffAnotherBallVelocity = 0.05;
let gravity = 0.05;
let boundaryVelocity = -0.9;
let song;
let amp;
let ballX = [];
let ballY = [];
let ballVelocityX = [];
let ballVelocityY = [];
let ballDiameter = [];

function preload(){

  song = loadSound("goth.mp3");
}

function setup(){

  createCanvas(1400, 800);

  for (let i = 0; i < numBalls; i++){

    let ballSpawnX = random(width);
    let ballSpawnY =  random(height);
    let ballDiameter = random(20, 50);
    createBall(ballSpawnX, ballSpawnY, ballDiameter);
  }
  frameRate(24);
  amp = new p5.Amplitude();
  song.play();
  song.loop();
}

function displayBall(myIndex) {
    //Give the ball a random coloured stroke
    stroke(color(random(255), random(255), random(255)));
    //Ensures there's no fill
    fill(0, 0, 0);
    ellipse(ballX[myIndex], ballY[myIndex], ballDiameter[myIndex], ballDiameter[myIndex]);
}

//Function that controls the ball's movement and boundary registry
function moveBall(myIndex){
    //gets the current amplitude of the song and places it into a variable
    let vol = amp.getLevel();
    //maps the amplitude to a diameter
    let diam = map(vol, 0, 0.75, 20, 150);
    //sets the diameter of the ball in respect to the amplitude of the song
    ballDiameter[myIndex] = diam;
    //Ensures the balls are always dropping to the bottom ot the canvas because of gravity
    ballVelocityY[myIndex] += gravity;
    //Increments the balls position with the velocity
    ballX[myIndex] += ballVelocityX[myIndex];
    ballY[myIndex] += ballVelocityY[myIndex];

    //If the ball has hit the right hand side of the canvas
    if (ballX[myIndex] + (ballDiameter[myIndex] / 2) > width){
      //Ensures the ball doesn't pass the boundary
      ballX[myIndex] = width - ballDiameter[myIndex] / 2;
      //Sets the velocity of the ball to ensure it moves away from the boundary it touched
      ballVelocityX[myIndex] *= boundaryVelocity;
    }
    //If the ball has hit the left hand side of the canvas
    else if (ballX[myIndex] - ballDiameter[myIndex] / 2 < 0){
      //Ensures the ball doesn't pass the boundary
      ballX[myIndex] = ballDiameter[myIndex] / 2;
      //Sets the velocity of the ball to ensure it moves away from the boundary it touched
      ballVelocityX[myIndex] *= boundaryVelocity;
    }
    //If the ball has hit the bottom of the canvas
    if (ballY[myIndex] + ballDiameter[myIndex] / 2 > height){
      //Ensures the ball doesn't pass the boundary
      ballY[myIndex] = height - ballDiameter[myIndex] / 2;
      //Sets the velocity of the ball to ensure it moves away from the boundary it touched
      ballVelocityY[myIndex] *= boundaryVelocity;
    }
    //If the ball has hit the top of the canvas
    else if (ballY[myIndex] - ballDiameter[myIndex] / 2 < 0){
      //Ensures the ball doesn't pass the boundary
      ballY[myIndex] = ballDiameter[myIndex] / 2;
      //Sets the velocity of the ball to ensure it moves away from the boundary it touched
      ballVelocityY[myIndex] *= boundaryVelocity;
    }
}

function ballCollide(myIndex){
  /*
   * We set i to the index infront of the current ball. We can do this to check what
   * all the other balls variables are in respect to the current ball.
   */
  for (let i = myIndex + 1; i < numBalls; i++) {
    //Gets the distance between the ball infront and the current ball
    let dx = ballX[i] - ballX[myIndex];
    let dy = ballY[i] - ballY[myIndex];
    //Calculates the distance between the 2 balls using the x and y distance between the both
    let distanceBetweenBalls = sqrt(dx * dx + dy * dy);
    //Sets the threshold needed to be achieved for the balls to bounce off each other
    let minimumBounceThreshold = ballDiameter[i] / 2 + ballDiameter[myIndex] / 2;

    if (distanceBetweenBalls < minimumBounceThreshold){
      //Some complex trig from the example that I couldn't fully understand
      let angle = atan2(dy, dx);
      let targetX = ballX[myIndex] + cos(angle) * minimumBounceThreshold;
      let targetY = ballY[myIndex] + sin(angle) * minimumBounceThreshold;
      let ax = (targetX - ballX[i]) * bounceOffAnotherBallVelocity;
      let ay = (targetY - ballY[i]) * bounceOffAnotherBallVelocity;
      ballVelocityX[myIndex] -= ax;
      ballVelocityY[myIndex] -= ay;
      ballVelocityX[i] += ax;
      ballVelocityY[i] += ax;
    }
  }
}

//Function that adds the ball's variables to the array
function createBall(x, y, diameter){

  append(ballX, x);
  append(ballY, y);
  append(ballDiameter, diameter);
  append(ballVelocityX, 0);
  append(ballVelocityY, 0);
}

function draw(){

  background(10, 10);
  for(let i = 0; i < numBalls; i++){
    ballCollide(i);
    moveBall(i);
    displayBall(i);
  }

  stroke(25, 25, 25);
  fill(10, 10, 10);
  /*
   * rectangles have been placed to appear randomly. The fill has been assigned to blend with
   * the background and the stroke is visible enough that it allows the rectangles to faintly
   * cut around the ellipse. As a result, this chops up the ellipse in random places giving off
   * a neon after light effect.
  */
  rect(random(0, width), random(0, height), random(800,300), random(800,300))
}
