var serial;
var portName = '/dev/cu.AdafruitEZ-Link74ae-SPP'; // fill in your bluetooth serial port name here
var inData;
var ball = {};
var panValue = 0.0;     //initial pan: balanced across left and right
var volumeValue = 0.5;  //initial volume level
var serialStarted = 0;
var soundFile;          //This file plays when user clicks anywhere on the window

function setup() {
  
  soundFormats('ogg', 'mp3');
  soundFile = loadSound('assets/sherlock.mp3');

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
  createCanvas(800, 600);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}

function serialEvent() {
  println("Event Started");
  inData = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inData.length > 2) {
    serialStarted = 1;
    var sensors = split(inData, ','); // split the string on the commas
    if (sensors.length > 1) { // if there are three elements
      panValue = sensors[1]; // element 0 is the locH
      volumeValue = sensors[0]; // element 1 is the locV
    }
  }
}

function draw() {
  background(0);
  fill(150);
  text("sensor value: " + inData, 30, 30);

  if (serialStarted == 1) {
    ball.x = constrain(mouseX, 0, width);
    ellipse(map(panValue, 515, 565, 0, width), height / 2, 20, 20);

    ball.y = constrain(mouseY, 0, width);
    ellipse((width / 2), map(volumeValue, 515, 565, height, 0), 20, 20);


    var panning = map(panValue, 430, 250, -1.0, 1.0);
    soundFile.pan(panning);
    var volume = map(volumeValue, 250, 410, 0, 1.0);
    soundFile.setVolume(volume);
  }
}

function mousePressed() {
  println("Mouse Pressed Started");
  soundFile.play();
}