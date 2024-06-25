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
      // Custom collision detection between obstacles
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
  