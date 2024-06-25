let player;
let obstacles = [];
let gameSpeed = 5;
let score = 0;
let gameOver = false;
let restartButton;

function preload() {
    
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();

  restartButton = createButton('Restart Game');
  restartButton.position(width / 2 - 100, height / 2 + 50);
  restartButton.size(200, 50);
  restartButton.mousePressed(restartGame);
  restartButton.hide(); 
}

function draw() {
  background(220);

  if (!gameOver) {
    player.update();
    player.show();

    if (random(1) < 0.01) {
      let obstacle = new Obstacle();

      while (obstacleCollides(obstacle)) {
        obstacle = new Obstacle();
      }

      obstacles.push(obstacle);
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();

      if (obstacles[i].offScreen()) {
        obstacles.splice(i, 1);
        score++;
      }

      if (player.hits(obstacles[i])) {
        console.log('Game Over');
        gameOver = true;
        showRestartButton();
        noLoop();
      }
    }

    textSize(32);
    fill(0);
    text(`Score: ${score}`, 20, 40);
  } else {
    textSize(64);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2);
  }
}

function showRestartButton() {
  restartButton.show();
}

function restartGame() {
  player = new Player();
  obstacles = [];
  score = 0;
  gameOver = false;
  restartButton.hide();
  loop();
}

function keyPressed() {
  if (!gameOver && (key === ' ' || keyCode === UP_ARROW)) {
    player.jump();
  }
}

class Player {
  constructor() {
    this.size = 50;
    this.x = 50;
    this.y = height - this.size;
    this.yVelocity = 0;
    this.gravity = 1.5;
  }

  jump() {
    if (this.y === height - this.size) {
      this.yVelocity = -20;
    }
  }

  hits(obstacle) {
    let playerRight = this.x + this.size;
    let playerBottom = this.y + this.size;
    let obstacleRight = obstacle.x + obstacle.size;
    let obstacleBottom = obstacle.y + obstacle.size;

    return (
      playerRight > obstacle.x &&
      this.x < obstacleRight &&
      playerBottom > obstacle.y &&
      this.y < obstacleBottom
    );
  }

  update() {
    this.y += this.yVelocity;
    this.yVelocity += this.gravity;
    this.y = constrain(this.y, 0, height - this.size);
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Obstacle {
  constructor() {
    this.size = 50;
    this.x = width;
    this.y = height - this.size;
    this.speed = gameSpeed;
  }

  update() {
    this.x -= this.speed;
  }

  offScreen() {
    return this.x < -this.size;
  }

  collidesWith(other) {
    return (
      this.x + this.size > other.x &&
      this.x < other.x + other.size &&
      this.y + this.size > other.y &&
      this.y < other.y + other.size
    );
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }
}

function obstacleCollides(newObstacle) {
  for (let obstacle of obstacles) {
    if (newObstacle.collidesWith(obstacle)) {
      return true;
    }
  }
  return false;
}
