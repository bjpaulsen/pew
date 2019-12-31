class Asteroid {
  constructor(x = random(width), y = random(height), rad = random(40, 110)){
    while (dist(x, y, ship.position.x, ship.position.y) < 200) {
      x = random(width);
      y = random(height)
    }
    this.position = createVector(x, y);
    this.radius = rad;
    this.vertices = floor(random(7, 13));
    let vel = p5.Vector.random2D();
    this.velocity = vel.mult(random(1, 2.75));
    this.offset = [];
    for (let i = 0; i < this.vertices; i++) this.offset[i] = random(-15, 15);
    this.buffer = this.radius/10;
  }

  render(){
    push();
    stroke(255);
    noFill();
    translate(this.position.x, this.position.y);
    //ellipse(this.position.x, this.position.y, this.radius, this.radius)
    beginShape();
    for (let i = 0; i < this.vertices; i++){
      let angle = map(i, 0, this.vertices, 0, TWO_PI);
      let r = this.radius + this.offset[i];
      let x = r*cos(angle);
      let y = r*sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  move(){
    this.position.add(this.velocity);

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

  hits(obj){
    let d = dist(this.position.x, this.position.y, obj.position.x, obj.position.y);
    return d < this.radius+this.buffer;
  }

  break(){
    if (this.radius > 25) {
      asteroids.push(new Asteroid(this.position.x, this.position.y, round(2*this.radius/3)));
      asteroids.push(new Asteroid(this.position.x, this.position.y, round(2*this.radius/3)));
    } else {
      asteroids.push(new Asteroid());
    }
  }

}
