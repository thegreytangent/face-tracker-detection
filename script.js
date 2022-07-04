let button, mic, ctracker, capture;

function setup() {
  print("getCurrentPosition "); 
  createCanvas(640, 480);

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  //audio
  mic = new p5.AudioIn();
  mic.start();

  //face tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);

  button = createButton('like');
  button.style("display", "inline-block");
  button.style("color", "#ffff");
  button.style("padding", "5px 8px");
  button.style("text-decoration", "none");
  button.style("font-size", "0.9em");
  button.style("font-weight", "normal");
  button.style("border-radius", "3px");

  button.style("border", "none");
  button.style("text-shadow", "0 -1px 0 rgba(0, 0, 0, .2)");
  button.style("background", "#4c69ba");
  button.style("background", "-moz-linear-gradient(top, #4c69ba 0%, #3b55a0 100%)");

  button.style("background", "-webkit-gradient(linear, left top, left bottom,color-stop(0%, #3b55a0))");

  button.style("background", "-webkit-linear-gradient(top, #4c69ba 0%, #3b55a0 100%)");

  button.style("background", "-o-linear-gradient(top, #4c69ba 0%, #3b55a0 100%)");

  button.style("background", "-ms-linear-gradient(top, #4c69ba 0%, #3b55a0 100%)");

  button.style("background", "linear-gradient(to bottom, #4c69ba 0%, #3b55a0 100%)");

  button.style("filter", "progid:DXImageTransform.Microsoft.gradient (startColorstr = '#4c69ba', endColorstr = '#3b55a0', GradientType = 0)");
  //mouse capture
  button.mouseOut(revertStyle);
  button.mousePressed(change);

}

function draw() {
  let vol = mic.getLevel();

  button.size(floor(map(vol, 0, 1, 40, 450)));
  
  image(capture, 0,0,640, 480);
  filter(INVERT);

  let positions = ctracker.getCurrentPosition();

  if (positions.length) {
    button.position(positions[60][0]-20, positions[60][1]);
    
    for (let i = 0; i < positions.length; i++ ) {
      noStroke();
      fill(map(positions[i][0], 0, width, 100, 255), 0, 0, 120);
      ellipse(positions[i][0], positions[i][1], 5, 5);
    }
  }
}


function change() {
  button.style("background", "#2d3f74");
  userStartAudio();
}

function revertStyle() {
  button.style("background", "#4c69ba");
}


function keyPressed() {
  
  if (keyCode == 32) {
    console.log(" keyPressed ", keyCode);
    button.style("transform", "rotate(180deg)");
  } else {
    button.style("transform", "rotate(0deg)");
  }
}