let buildings = [];
let trees = [];
let mountains = [];

function setup() {
  createCanvas(800, 500);
  generateScene();
}

function draw() {
  drawSky();
  drawMountains();
  drawGround();
  drawBuildings(); // fixed name
  drawTrees();
}

// Generate random scene
function generateScene() {
  buildings = [];
  trees = [];
  mountains = [];
  
  // Buildings
  for (let i = 0; i < width; i += random(60, 100)) {
    buildings.push({ // FIXED (was building.push)
      x: i,
      w: random(50, 80),
      h: random(120, 300),
      color: color(random(100, 200), random(100, 200), random(100, 200))
    });
  }
  
  // Trees
  for (let i = 0; i < 10; i++) {
    trees.push({
      x: random(width),
      y: height - 50,
      size: random(30, 60)
    });
  }
  
  // Mountains
  for (let i = 0; i < width; i += 100) {
    mountains.push({
      x: i,
      h: random(100, 200)
    }); 
  }
}

// Sky gradient
function drawSky() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(135, 206, 235), color(255, 200, 150), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

// Mountains
function drawMountains() {
  fill(120, 120, 120);
  noStroke();
  
  for (let m of mountains) {
    triangle(
      m.x, height - 100,
      m.x + 100, height - 100,
      m.x + 50, height - 100 - m.h
    );
  }
}

// Ground
function drawGround() {
  fill(50, 180, 75);
  rect(0, height - 100, width, 100);
}

// Buildings
function drawBuildings() {
  for (let b of buildings) {
    fill(b.color);
    rect(b.x, height - 100 - b.h, b.w, b.h);
    
    // Windows
    fill(255, 255, 150);
    for (let y = height - 100 - b.h + 10; y < height - 110; y += 20) {
      for (let x = b.x + 5; x < b.x + b.w - 10; x += 15) {
        rect(x, y, 8, 10);
      }
    }
  }
}

// Trees
function drawTrees() {
  for (let t of trees) { // FIXED (was "dor")
    // trunk
    fill(100, 50, 0);
    rect(t.x, t.y, 8, 20);
    
    // leaves
    fill(34, 139, 34);
    ellipse(t.x + 4, t.y - 10, t.size);
  }
}

// Click to regenerate
function mousePressed() {
  generateScene();
}