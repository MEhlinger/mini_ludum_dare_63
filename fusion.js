// Mini Ludum Dare 63 Game
// Theme: Fusion
// Code by: Marshall Ehlinger

// Set-up
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

bgColor = "#000000";

// Graphical Assets
var pcReady = false;
var pcImage = new Image();
pcImage.onload = function() {
	pcReady = true;
};
pcImage.src = "images/pc.png";
pcImageSize = (pcImage.height + pcImage.width) / 2;

// Game Objects
var pc = {
	speed : 500, //in pixels per second
	x : 0,
	y : 0,
	renderX : 0,
	renderY : 0
};

var map = {
	height : 10000,
	width: 10000
};

var stars = [];
var starsOnMap = 10000; 


// User Input
var keysPressed = {};

addEventListener("keydown", function(e) {keysPressed[e.keyCode] = true;}, false);
addEventListener("keyup", function(e) {delete keysPressed[e.keyCode];}, false);

var setup = function() {
	pc.x = map.width / 2;
	pc.y = map.height / 2;
	pc.renderX = canvas.width / 2;
	pc.renderY = canvas.height / 2;

	for (i = 0; i < starsOnMap; i++) {
		stars.push([Math.random() * map.width, Math.random() * map.height]);
	}
};

// Update
var update = function (modifier) {
	if (38 in keysPressed) {
		//up
		newY = pc.y - pc.speed * modifier;
		if (newY >= 32) {
			pc.y = newY;
		}
	}
	if (40 in keysPressed) {
		//down
		newY = pc.y + pc.speed * modifier;
		if (newY <= map.height-32) {
			pc.y = newY
		}
	}
	if (37 in keysPressed) {
		// left
		newX = pc.x - pc.speed * modifier;
		if (newX >= 32) {
			pc.x = newX;
		}
	}
	if (39 in keysPressed) {
		// right
		newX = pc.x + pc.speed * modifier;
		if (newX <= map.width-32) {
			pc.x = newX;
		}
	}
};

var isOnScreen = function(objectInSpaceX, objectInSpaceY) {
	if (
		(objectInSpaceX <= pc.x + canvas.width - (canvas.width - pc.renderX))
		&& (objectInSpaceX >= pc.x - canvas.width - pc.renderX)
		&& (objectInSpaceY <= pc.y + canvas.height - (canvas.height - pc.renderY))
		&& (objectInSpaceY >= pc.y - canvas.height - pc.renderY)
		) {
		return true;	
	}
};


// Render Everything
var render = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = bgColor; 
	context.fillRect(0, 0, canvas.width, canvas.height);

	
	for (i = 0; i < stars.length; i++) {
		context.fillStyle = "#FFFFFF";
		if (isOnScreen(stars[i][0], stars[i][1])) {
			context.fillRect(pc.renderX - (pc.x - stars[i][0]) , pc.renderY - (pc.y - stars[i][1]), 1, 1);
		}
	}

	if (pcReady) {
		// render pc in center of view at all times...
		pc.renderX = canvas.width / 2;
		pc.renderY = canvas.height / 2;
		// ... unless pc is near edges of map.
		// NOTE: this is for bounded map. Try wrapping, alternatively??
		if (pc.x >= map.width - (canvas.width / 2)) {
			pc.renderX = canvas.width - (map.width - pc.x);
		} else if (pc.x <= canvas.width / 2) {
			pc.renderX = pc.x;
		}
		if (pc.y >= map.height - (canvas.height / 2)) {
			pc.renderY = canvas.height - (map.height -pc.y);
		} else if (pc.y <= canvas.height / 2) {
			pc.renderY = pc.y;
		}
		context.drawImage(pcImage, pc.renderX - pcImageSize/2, pc.renderY - pcImageSize/2);
	}	
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