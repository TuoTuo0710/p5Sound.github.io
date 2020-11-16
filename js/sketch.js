let inc = 0.08;
let scl = 20;
let particleCount = 800; 
let xMoving,yMoving;
let rows,cols;

let particles = [];
let flowField = [];

let currentId = 0;
let IsPressed = false;

function setup() {
  createCanvas(400, 400).parent("main-display");
  pixelDensity(1);
  xMoving = 0;
  yMoving = 0;
  rows = floor(height/scl);
  cols = floor(width/scl);
  flowField = new Array(rows*cols);
  for(let i = 0 ; i < particleCount ; i++){
    particles[i] = new particle();
  }
}

function draw() {
  background(255);
  let xOffset = xMoving;
  for(let x = 0 ; x < cols ; x++){
    let yOffset = yMoving;
    for(let y = 0 ; y < rows; y++){
      let index = x + y * cols;
      let noiseVal = noise(xOffset,yOffset)*1.5;
      let angle = noiseVal * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);
      flowField[index] = v;
      showBlock(x,y,noiseVal);
      showVectorDir(x,y,v);
      yOffset+=inc;
    }
    xOffset+=inc;
  }
  xMoving += 0.01;
  yMoving += 0.01;

  fill(0,100);
  rect(0,0,width,height);
  for(let i = 0 ; i < particleCount ; i++){
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }

  let frameRateP = document.getElementById("frameRate");
  frameRateP.innerHTML = `Frame Rate: ${floor(frameRate())}`;

  if(IsPressed){
    setParticlePos();
  }
}

function mousePressed() {
  IsPressed = true;
}

function mouseReleased(){
  IsPressed = false;
}

function setParticlePos(){
  particles[currentId].pos = createVector(mouseX,mouseY);
  currentId++;
  currentId = currentId > particles.length-1 ? 0 : currentId;
  print("done");
}


function showBlock(x,y,v){
  let color = v*255 > 255 ? 255 : v*255;
  strokeWeight(1);
  stroke(0,30);
  fill(color);
  rect(x*scl,y*scl,scl,scl);
}

function showVectorDir(x,y,v){
  strokeWeight(2);
  stroke(0,25);
  push();
  translate(x*scl,y*scl);
  rotate(v.heading());
  line(0,0,scl,0);
  pop();
}