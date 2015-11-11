// Mini Ludum Dare 63 Game
// Theme: Fusion
// Code by: Marshall Ehlinger

// Set-up
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var mapWidth = 10000;
var mapHeight = 10000;


// Graphical Assets
var pcReady = false;
var pcImage = new Image();
pcImage.onload = function() {
	pcReady = true;
};
pcImage.src = "images/pc.png";


// Game Objects
var pc = {
	speed : 500, //in pixels per second
	x : 0,
	y : 0,
	renderX : 0,
	renderY : 0
};


// User Input
var keysCache = {};

addEventListener("keydown", function(e) {keysCache[e.keyCode] = true;}, false);
addEventListener("keyup", function(e) {delete keysCache[e.keyCode];}, false);

var setup = function() {
	pc.x = mapWidth / 2;
	pc.y = mapHeight / 2;
	pc.renderX = canvas.width / 2;
	pc.renderY = canvas.height / 2;
};

// Update
var update = function (modifier) {
	if (38 in keysCache) {
		//up
		newY = pc.y - pc.speed * modifier;
		if (newY >= 32) {
			pc.y = newY;
		}
	}
	if (40 in keysCache) {
		//down
		newY = pc.y + pc.speed * modifier;
		if (newY <= mapHeight-32) {
			pc.y = newY
		}
	}
	if (37 in keysCache) {
		// left
		newX = pc.x - pc.speed * modifier;
		if (newX >= 32) {
			pc.x = newX;
		}
	}
	if (39 in keysCache) {
		// right
		newX = pc.x + pc.speed * modifier;
		if (newX <= mapWidth-32) {
			pc.x = newX;
		}
	}
};


// Render Everything
var render = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (pcReady) {
		// render pc in center of view at all times...
		pc.renderX = canvas.width / 2;
		pc.renderY = canvas.height / 2;
		// ... unless pc is near edges of map.
		// NOTE: this is for bounded map. Try wrapping, alternatively??
		if (pc.x >= mapWidth - (canvas.width / 2)) {
			pc.renderX = canvas.width - (mapWidth - pc.x);
		} else if (pc.x <= canvas.width / 2) {
			pc.renderX = pc.x;
		}
		if (pc.y >= mapHeight - (canvas.height / 2)) {
			pc.renderY = canvas.height - (mapHeight -pc.y);
		} else if (pc.y <= canvas.height / 2) {
			pc.renderY = pc.y;
		}
		context.drawImage(pcImage, pc.renderX, pc.renderY);
	}	
	context.fillStyle = "rgb(253, 250, 255)";
};

// Main Loop
var main = function() {
	var MILLISECONDS = 1000;
	var now = Date.now();
	var delta = now - lastUpdate;

	update(delta / MILLISECONDS);
	render();
	lastUpdate = now;
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

/////////////
// EXECUTE //
/////////////
var lastUpdate = Date.now();
setup();
main();