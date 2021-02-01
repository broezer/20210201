//Function for landscape by 
// Daniel Shiffman
// http://codingtra.in
// Edited by SacrificeProductions

// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let c1, c2, c3;

let cols, rows;
let scl = 40;
let w = 1400;
let h = 1000;

let flying = 0;

let terrain = [];



function setup() {
   createCanvas(400, 400, WEBGL);
   c1 = color(0, 0, 0);
   c2 = color(150, 150, 150);
   c3 = color(255, 255, 255);
   
   cols = w / scl;
   rows = h / scl;

   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
   
}


function draw() {
  flying -= 0.05;
  var yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  
 
  setGradient(-width*0.5, -height*0.5, width, height *0.5, c1, c2, Y_AXIS);
  setGradient(-width*0.5,0, width, height*0.5, c2, c2 ,Y_AXIS);
  
  push();
  noFill();
  stroke(c3);
  circle(width*0.25, height*0.1, width * 0.5);
  pop();
  
  push();
  translate(0, height * 0.15);
  rotateX(PI / 2);
  noFill();
  stroke(c3);
  translate(-w / 2, 0);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    
    for (let x = 0; x < cols; x++) {
      fill(c2);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  pop();
  
  save("20210201.png");
  noLoop();
  
  
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
