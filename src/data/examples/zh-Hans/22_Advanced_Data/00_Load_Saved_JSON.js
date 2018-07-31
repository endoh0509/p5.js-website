/*
 * @name Load Saved JSON
 * @description Create a Bubble class, instantiate multiple bubbles using data from
 * a JSON file, and display results on the screen.
 *  Because the web browsers differ in where they save files, we do not make use of 
 * saveJSON, unlike the Processing example.<br><br>
 * Based on Daniel Shiffman's <a href="https://processing.org/examples/loadsavejson.html">LoadSaveJSON Example</a> for Processing.
 */
var data = {}; // Global object to hold results from the loadJSON call
var bubbles = []; // Global array to hold all bubble objects

// Put any asynchronous data loading in preload to complete before "setup" is run
function preload() {
  data = loadJSON('assets/bubbles.json');
}

// Convert saved Bubble data into Bubble Objects
function loadData() {
  var bubbleData = data['bubbles'];
  for (var i = 0; i < bubbleData.length; i++) {
    // Get each object in the array
    var bubble = bubbleData[i];
    // Get a position object
    var position = bubble['position'];
    // Get x,y from position
    var x = position['x'];
    var y = position['y'];

    // Get diameter and label
    var diameter = bubble['diameter'];
    var label = bubble['label'];

    // Put object in array
    bubbles.push(new Bubble(x, y, diameter, label));
  }
}

// Create a new Bubble each time the mouse is clicked.
function mousePressed() {
  // Add diameter and label to bubble
  var diameter = random(40, 80);
  var label = 'New Label';

  // Append the new JSON bubble object to the array
  bubbles.push(new Bubble(mouseX, mouseY, diameter, label));

  // Prune Bubble Count if there are too many
  if (bubbles.length > 10) {
    bubbles.shift(); // remove first item from array
  }
}

function setup() {
  createCanvas(640, 360);
  loadData();
}

function draw() {
  background(255);

  // Display all bubbles
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].rollover(mouseX, mouseY);
  }

  // Label directions at bottom
  textAlign(LEFT);
  fill(0);
  text('Click to add bubbles.', 10, height - 10);
}

// Bubble class
function Bubble(x, y, diameter, name) {
  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.radius = diameter / 2;
  this.name = name;

  this.over = false;

  // Check if mouse is over the bubble
  this.rollover = function(px, py) {
    var d = dist(px, py, this.x, this.y);
    if (d < this.radius) {
      this.over = true;
    } else {
      this.over = false;
    }
  };

  // Display the Bubble
  this.display = function() {
    stroke(0);
    strokeWeight(0.8);
    noFill();
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      fill(0);
      textAlign(CENTER);
      text(this.name, this.x, this.y + this.radius + 20);
    }
  };
}
