class Projectile{

  constructor(positionX, positionY, enemyIndex, attackColour, attackSpeed){
    this.startLocation = createVector(positionX, positionY);
    this.attackSpeed = attackSpeed;
    this.attackColour = attackColour;
    this.pos = createVector(positionX, positionY);
    this.enemyIndex = enemyIndex;
    this.successfullHit = false;
  }

  move(){

    var target = createVector(enemies[this.enemyIndex].pos.x, enemies[this.enemyIndex].pos.y);
    var distance = target.dist(this.pos);

    target.sub(this.pos);
    target.normalize();
    //Set the speed the bullet moves
    target.mult(this.attackSpeed);
    this.pos.add(target);

    //We've hit an enemy
    if(distance <= 20){
      //return the projectile position back to the wizard
      this.pos = createVector(this.startLocation.x, this.startLocation.y);
      this.successfullHit = true;
    }
  }

  display(){
    //neon pink
    fill(this.attackColour);
    circle(this.pos.x, this.pos.y, 20);
  }
}
