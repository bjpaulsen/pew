const ASTEROID_NUMBER = 9;

let ship;
let asteroids = [];
let shots = [];
let score = 0;
let highscore = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  ship = new Ship();
  for (let a = 0; a < ASTEROID_NUMBER; a++) asteroids.push(new Asteroid());
}

function draw(){
  background(0);

  for (pew of shots){
    pew.move();
    pew.show();
  }

  for (let s = shots.length-1; s >= 0; s--){
    if (shots[s].position.x > width || shots[s].position.x < 0 || shots[s].position.y > height || shots[s].position.y < 0){
      shots.splice(s, 1);
    }
  }

  for (let s = shots.length-1; s >= 0; s--){
    for (let j = asteroids.length-1; j >= 0; j--){
      if (asteroids[j].hits(shots[s])){
        asteroids[j].break();
        asteroids.splice(j, 1);
        shots.splice(s, 1);
        score++;
        if (score > highscore) highscore++;
        document.getElementById("score").innerHTML = score;
        document.getElementById("highscore").innerHTML = highscore;
        break;
      }
    }
  }

  ship.rotate();
  ship.move();
  ship.show();

  for (let ast of asteroids){
    if (ast.hits(ship)){
      document.getElementById("notif").innerHTML = "R to Restart.";
      noLoop();
    }
  }

  for (let elt of asteroids){
    elt.render();
    elt.move();
  }
}

function keyPressed(){
  if (keyCode == 32){
    shots.push(new Shot(ship.position, ship.angle));
  } else if (keyCode == 82) {
    restart();
  }
}

function restart(){
  asteroids = [];
  for (let a = 0; a < ASTEROID_NUMBER; a++) asteroids.push(new Asteroid());

  shots = [];
  ship = new Ship();

  score = 0;
  document.getElementById("score").innerHTML = score;
  document.getElementById("notif").innerHTML = " ";

  loop();
}
