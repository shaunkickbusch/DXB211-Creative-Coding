class Wizard{

  constructor(positionX, positionY){
    this.type = 'WIZARD';
    this.pos = createVector(positionX, positionY);
    this.frameCounter = 0;
    this.enemiesKilled = 0;
    this.attack = new Projectile(positionX, positionY, 0, color("#1b03a3"), WIZARD_ATTACK_SPEED);
    this.currentEnemyIndex = 0;
    this.sellPrice = WIZARD_SELL_PRICE;
    this.areWeAttacking = false;
  }

  attackMove(){

    //Change framerate of the wizard sprite
    if (!(frameCount % 10)){
      this.frameCounter = (this.frameCounter + 1) % wizardAttack.length;
    }

    //Ensure the game doesn't freeze because there's currently no enemies in the array
    if(enemies.length > 0){
      this.attack.move();
      if(this.attack.successfullHit === true){
        hitAudio.play();
        enemies[this.currentEnemyIndex].currentHealth -= 10;
        this.attack.successfullHit = false;
        if(enemies[this.currentEnemyIndex].hasDied === true){
          moneyAmount += 20;
          //Remove the enemy from the array
          enemies.splice(this.currentEnemyIndex, 1);
          totalEnemiesDead++;
          //this.currentEnemyIndex++;
          //Move the projectile onto the next target
          this.attack = new Projectile(this.pos.x, this.pos.y, 0, color("#1b03a3"), WIZARD_ATTACK_SPEED);
        }
      }
    }
  }

  attackDisplay(){
    if(enemies.length > 0){
      this.attack.display();
      print("We got here");
      image(wizardAttack[this.frameCounter], this.pos.x + WIZARD_IMG_X_OFFSET, this.pos.y - WIZARD_IMG_Y_OFFSET);
    }
  }

  moveIdle(){
    if (!(frameCount % 10)){
      this.frameCounter = (this.frameCounter + 1) % wizardIdle.length;
    }
  }

  displayIdle(){
    image(wizardIdle[this.frameCounter], this.pos.x + WIZARD_IMG_X_OFFSET, this.pos.y - WIZARD_IMG_Y_OFFSET);
  }
}
