const SHIP_LENGTH = 6;
const TURN_SPEED = .06;
const FRICTION = .998; // should there be space friction? (1 == none)
const THRUST = .3; // how strong is UP_ARROW?

class Ship {
  constructor(){
    this.position = createVector(width/2, height/2);
    this.radius = 18;
    this.angle = -PI/2;
    this.velocity = createVector(0, 0);
  }

  show(){
    push();
    fill(0);
    stroke(255);
    strokeWeight(1);
    translate(this.position.x, this.position.y);
    rotate(this.angle+PI/2);
    triangle(-this.radius, this.radius+SHIP_LENGTH, this.radius, this.radius+SHIP_LENGTH, 0, -this.radius-SHIP_LENGTH);
    pop();
  }

  rotate(){
    if (keyIsDown(LEFT_ARROW)) this.angle-=TURN_SPEED;
    if (keyIsDown(RIGHT_ARROW)) this.angle+=TURN_SPEED;
  }

  move(){
    this.position.add(this.velocity);
    let force = p5.Vector.fromAngle(this.angle);
    force.mult(THRUST);
    if (keyIsDown(UP_ARROW)) this.velocity.add(force);
    this.velocity.mult(FRICTION);

    if (this.position.x > width+this.radius){
      this.position.x = -this.radius;
    } else if (this.position.x < -this.radius){
      this.position.x = width+this.radius;
    }
    if (this.position.y > height+this.radius){
      this.position.y = -this.radius;
    } else if (this.position.y < -this.radius){
      this.position.y = height+this.radius;
    }
  }
}
