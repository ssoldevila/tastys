// Berta Güell i Sònia Soldevila- Ddtec 1curs
// Joc interactiu de peixos - Exercici 4

let fish;
let ripples = [];
let bubbles = [];
let maxElements = 10;
let colors = ['#FF6347', '#4682B4', '#FFD700', '#32CD32', '#FF69B4'];
let fishSize = 60; // Tamany del peix

function setup() {
  let peix= createCanvas(windowWidth, windowHeight);
  peix.parent('p5js')
  fish = new Fish();
  fish.setup();

  // Crear bombolles
  for (let i = 0; i < 20; i++) {
    let bubble = new Bubble();
    bubble.setup(random(width), random(height));
    bubbles.push(bubble);
  }
}

function draw() {
  background('#1E90FF'); // Color del fons d'aigua

  // Dibuixar les bombolles
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].move();
    bubbles[i].display();
    if (bubbles[i].isFinished()) {
      bubbles.splice(i, 1);
      let bubble = new Bubble();
      bubble.setup(random(width), height); // Crear noves bombolles pel fons
      bubbles.push(bubble);
    }
  }

  fish.move();
  fish.display();

  // Dibuixar cercles de les ones (al fer click)
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].display();
    ripples[i].update();
    if (ripples[i].isFinished()) {
      ripples.splice(i, 1);
    }
  }

  // Limitar el nombre d'ones
  if (ripples.length > maxElements) {
    ripples.splice(0, ripples.length - maxElements);
  }
}

function mousePressed() {
  // Afegir una nova ona al fer click
  let ripple = new Ripple();
  ripple.setup(mouseX, mouseY);
  ripples.push(ripple);

  // Verificar si s'ha fet click sobre el peix
  if (dist(mouseX, mouseY, fish.x, fish.y) < fishSize) {
    fish.bounce();
  }
}

class Fish {
  setup() {
    this.x = random(width);
    this.y = random(height);
    this.xSpeed = random(1, 3) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(1, 3) * (random() > 0.5 ? 1 : -1);
    this.color = random(colors);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Rebotar als cantons
    if (this.x > width || this.x < 0) {
      this.xSpeed *= -1;
      this.xSpeed += random(-0.5, 0.5); // Afegir variació aleatoria
    }
    if (this.y > height || this.y < 0) {
      this.ySpeed *= -1;
      this.ySpeed += random(-0.5, 0.5); // Afegir variació aleatoria
    }
  }

  display() {
    fill(this.color);
    noStroke();
    
    // Cos del peix
    ellipse(this.x, this.y, fishSize, fishSize / 2);
    
    // Aletes
    triangle(this.x - fishSize / 2, this.y, this.x - fishSize, this.y - fishSize / 4, this.x - fishSize, this.y + fishSize / 4);
    triangle(this.x + fishSize / 4, this.y - fishSize / 4, this.x + fishSize / 2, this.y, this.x + fishSize / 4, this.y + fishSize / 4);
    
    // Ull del peix
    fill(0);
    ellipse(this.x + fishSize / 4, this.y - fishSize / 8, fishSize / 10, fishSize / 10);
    
    // Escames (petits cercles)
    fill(255, 150);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (random() > 0.5) {
          push();
          translate(this.x + i * fishSize / 4, this.y + j * fishSize / 8);
          rotate(random(TWO_PI)); // Afegir rotació aleatoria
          ellipse(0, 0, fishSize / 10, fishSize / 20);
          pop();
        }
      }
    }
  }

  bounce() {
    // Canviar la direcció amb una nova velocitat aleatoria
    this.setup();
  }
}

class Ripple {
  setup(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.growth = random(1, 3);
    this.color = random(colors);
  }

  update() {
    this.size += this.growth;
  }

  display() {
    noFill();
    stroke(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isFinished() {
    return this.size > 100;
  }
}

class Bubble {
  setup(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 15);
    this.speed = random(0.5, 2);
  }

  move() {
    this.y -= this.speed;
  }

  display() {
    fill(255, 150);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  isFinished() {
    return this.y < -this.size;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
