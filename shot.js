const SHOT_SPEED = 8;

class Shot {
  constructor(shipPosition, angle){
    this.position = createVector(shipPosition.x, shipPosition.y);
    let tempVel = p5.Vector.fromAngle(angle);
    this.velocity = tempVel.mult(SHOT_SPEED);
    this.angle = angle;
    this.radius = 2;
  }

  show(){
    push();
    stroke(255);
    strokeWeight(4);
    point(this.position.x, this.position.y);
    pop();
  }

  move(){
    this.position.add(this.velocity);
  }
}
