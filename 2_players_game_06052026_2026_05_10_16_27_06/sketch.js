let markerX;
let speed = 15;
let gameOver = false;
let winner = "";
let particles = [];

function setup() {
  createCanvas(800, 400);
  markerX = width / 2;
}

function draw() {
  drawRainbowBackground();

  // Center line (glowing style)
  stroke(255, 180);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);

  noStroke();

  // Goals with gradient feel
  fill(0, 150, 255, 180);
  rect(0, 0, 60, height);

  fill(255, 80, 120, 180);
  rect(width - 60, 0, 60, height);

  // Marker glow
  drawMarker();

  // Particles trail
  updateParticles();

  // UI text
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text("Player 1: Press 'A' | Player 2: Press 'L'", width / 2, 30);

  // Win screen
  if (gameOver) {
    fill(255, 255, 0);
    textSize(40);
    text(winner + " Wins!", width / 2, height / 2);

    textSize(16);
    text("Press R to Restart", width / 2, height / 2 + 40);
  }

  checkWin();
}

// 🌈 Animated rainbow background
function drawRainbowBackground() {
  for (let y = 0; y < height; y++) {
    let r = map(sin(frameCount * 0.01 + y * 0.02), -1, 1, 50, 255);
    let g = map(sin(frameCount * 0.015 + y * 0.02), -1, 1, 50, 200);
    let b = map(sin(frameCount * 0.02 + y * 0.02), -1, 1, 150, 255);
    stroke(r, g, b);
    line(0, y, width, y);
  }
}

// 💫 Marker with glow
function drawMarker() {
  // glow
  for (let i = 5; i > 0; i--) {
    fill(255, 255, 255, 20);
    ellipse(markerX, height / 2, 40 + i * 10);
  }

  fill(255);
  ellipse(markerX, height / 2, 40);

  // add particle
  particles.push({ x: markerX, y: height / 2, life: 255 });
}

// ✨ particles system
function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    fill(255, p.life);
    ellipse(p.x, p.y, 8);

    p.life -= 5;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (!gameOver) {
    if (key === 'a' || key === 'A') {
      markerX -= speed;
    }
    if (key === 'l' || key === 'L') {
      markerX += speed;
    }
  }

  if (gameOver && (key === 'r' || key === 'R')) {
    markerX = width / 2;
    gameOver = false;
    winner = "";
    particles = [];
  }
}

function checkWin() {
  if (markerX <= 60) {
    gameOver = true;
    winner = "Player 1";
  }
  if (markerX >= width - 60) {
    gameOver = true;
    winner = "Player 2";
  }
}