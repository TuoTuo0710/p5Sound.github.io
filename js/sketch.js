let mic;

function setup() {
  // createCanvas(800, 500);
  createCanvas(windowWidth, windowHeight);
  xpos = width * 0.5;
  ypos = height * 0.5;
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(40);
  const vol = mic.getLevel();
  const radius = map(vol, 0, 0.05, 10, 50);
  noStroke();
  fill(200, 190, 190);
  ellipse(xpos, ypos, radius, radius);
  getAudioContext().resume();
}

function touchStarted() {
    getAudioContext().resume();
  }