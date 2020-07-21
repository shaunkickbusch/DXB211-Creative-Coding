class Star{

  constructor(x, y, alpha, alphaDecrement, isInvis){
    this.pos = createVector(x,y);
    this.alpha = alpha;
    this.alphaDecrement = alphaDecrement;
    this.isInvis = isInvis;
  }

  twinkle(){
    //If the alpha is creater or equal to 255 it's visible
    if(this.alpha >= 255){
      this.isInvis = true;
    }
    if(this.alpha <= 0){
      this.isInvis = false;
    }

    if(this.isInvis){
      this.alpha -= this.alphaDecrement;
    }
    else{
      this.alpha += this.alphaDecrement;
    }
  }

  display(){
    strokeWeight(3);
    stroke(this.alpha);
    point(this.pos.x, this.pos.y);
    noStroke();
  }
}
