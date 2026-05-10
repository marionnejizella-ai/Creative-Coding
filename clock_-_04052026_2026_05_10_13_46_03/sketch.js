let stars = [];

function setup() {
  createCanvas(800, 500);
  angleMode(DEGREES);

  // Create stars
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4)
    });
  }
}

function draw() {

  let h = hour();

  // DAY OR NIGHT
  let isNight = (h >= 18 || h < 6);

  // Rainbow horizontal background
  drawRainbowBackground(isNight);

  // DAY EFFECTS
  if (!isNight) {
    drawSun();
    drawClouds();
  }

  // NIGHT EFFECTS
  if (isNight) {
    drawMoon();
    drawStars();
  }

  // CLOCK
  drawClock();
}

// ===============================
// RAINBOW BACKGROUND
// ===============================
function drawRainbowBackground(isNight) {

  let colors;

  if (isNight) {
    colors = [
      color(40, 0, 60),
      color(0, 30, 80),
      color(20, 0, 50),
      color(0, 50, 90),
      color(30, 0, 70),
      color(0, 20, 40)
    ];
  } else {
    colors = [
      color(255, 0, 0),
      color(255, 140, 0),
      color(255, 255, 0),
      color(0, 255, 0),
      color(0, 180, 255),
      color(75, 0, 130),
      color(238, 130, 238)
    ];
  }

  let stripeHeight = height / colors.length;

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    noStroke();
    rect(0, i * stripeHeight, width, stripeHeight + 2);
  }
}

// ===============================
// SUN
// ===============================
function drawSun() {
  push();

  translate(100, 100);

  fill(255, 255, 120);
  noStroke();
  ellipse(0, 0, 90);

  // Sun rays
  stroke(255, 240, 100);
  strokeWeight(4);

  for (let i = 0; i < 360; i += 30) {
    let x = cos(i) * 60;
    let y = sin(i) * 60;
    line(0, 0, x, y);
  }

  pop();
}

// ===============================
// CLOUDS
// ===============================
function drawClouds() {

  fill(255, 230);

  drawCloud(250 + sin(frameCount * 0.3) * 20, 90);
  drawCloud(550 + sin(frameCount * 0.2) * 15, 150);
}

function drawCloud(x, y) {
  noStroke();

  ellipse(x, y, 70, 50);
  ellipse(x + 30, y, 60, 45);
  ellipse(x - 30, y, 60, 45);
  ellipse(x, y - 20, 60, 45);
}

// ===============================
// MOON
// ===============================
function drawMoon() {

  fill(255, 255, 210);
  noStroke();
  ellipse(120, 100, 90);

  fill(30, 0, 50);
  ellipse(140, 90, 70);
}

// ===============================
// STARS
// ===============================
function drawStars() {

  for (let s of stars) {

    fill(255, 255, 255, random(150, 255));
    noStroke();
    ellipse(s.x, s.y, s.size);
  }
}

// ===============================
// CLOCK
// ===============================
function drawClock() {

  push();

  translate(width / 2, height / 2);

  // Clock shadow
  fill(0, 80);
  noStroke();
  ellipse(10, 10, 280);

  // Clock body
  fill(255);
  stroke(0);
  strokeWeight(6);
  ellipse(0, 0, 260);

  // Numbers
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);

  for (let n = 1; n <= 12; n++) {

    let angle = map(n, 0, 12, 0, 360) - 90;

    let x = cos(angle) * 100;
    let y = sin(angle) * 100;

    text(n, x, y);
  }

  // Current time
  let hr = hour() % 12;
  let mn = minute();
  let sc = second();

  // SECOND HAND
  push();
  rotate(sc * 6 - 90);
  stroke(255, 0, 0);
  strokeWeight(2);
  line(0, 0, 90, 0);
  pop();

  // MINUTE HAND
  push();
  rotate(mn * 6 + sc * 0.1 - 90);
  stroke(0, 100, 255);
  strokeWeight(5);
  line(0, 0, 75, 0);
  pop();

  // HOUR HAND
  push();
  rotate(hr * 30 + mn * 0.5 - 90);
  stroke(0);
  strokeWeight(8);
  line(0, 0, 55, 0);
  pop();

  // Center
  fill(0);
  noStroke();
  ellipse(0, 0, 15);

  // Digital time
  fill(0);
  textSize(28);

  let displayHour = nf(hour(), 2);
  let displayMinute = nf(minute(), 2);
  let displaySecond = nf(second(), 2);

  text(
    displayHour + ":" + displayMinute + ":" + displaySecond,
    0,
    170
  );

  pop();
}