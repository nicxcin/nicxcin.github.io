var pi = Math.PI;

var WIDTH;
var HEIGHT;

var treeX;
var trunkW;

var branchX;

var branches = [];

var treeCol = '#886806';
var barkCol = '#410200';

var birdCol = '2,204,254';
var birbCol = '201, 176, 3';

var birb;
var storage;
var twigsBtn;

var ftx;
var btx;

var ES = [];

var resources;

var forestFloorCollect = function() {
	var time = 5;
	ES.push(new Notice("You collect 5 twigs", time));
	storage.add('twigs', 5);
	return time;
}

//collet event?

$(function() {

	engine.init();
	storage.init();

	setCanvas();
	setHtml();
	drawCanopy();
	startGame();
});

function startGame() {
	ES.push(new Notice("You land on a branch.", 3));
	ES.push(new Notice("This is a good branch.", 6));
	ES.push(new Notice("It's cold, a nest would help.", 8));
	ES.push(new Show(
		new Button(90, 30, 'Collect Twigs', 'Collect Loose Twigs off the forest floor', birb, 'You dive to the forest floor', forestFloorCollect), 8)
	);

	loop();
}


function loop() {
	//processes all events and run()s any that are ready.

	var event;
	for (var i = 0; i < ES.length; i++) {
		event = ES[i];

		if (event.delay <= 0) {
			event.run();
			ES.splice(i, 1);
			i--;
		} else {
			event.delay--;
		}
	}

	setTimeout(loop, 100);
}

class Notice {
	constructor(text, delay) {
		this.text = text;
		this.delay = delay;
	}

	run() {
		addNotice(this.text);
	}
}

class Show {
	constructor(ele, delay) {
		this.ele = ele;
		this.delay = delay;
	}

	run() {
		this.ele.show();
	}
}


function setHtml() {
	dragElement(document.getElementById("info"));
}

function setCanvas() {
	var forest = document.getElementById("forest");
	ftx = forest.getContext("2d");
	resizeCanvas(forest);

	var birds = document.getElementById("birds");
	btx = birds.getContext("2d");
	resizeCanvas(birds);

	WIDTH = ftx.canvas.width;
	HEIGHT = ftx.canvas.height;

	treeX = WIDTH/5;
	trunkW = 100;
	branchX = treeX + trunkW - 50;
	createCanopy(WIDTH, HEIGHT);
}

class Button {
	constructor(top, left, text, tip, bird, preAlert, action) {

		this.ele = $('<div></div>');
		this.ele.addClass('btn')
				.html(text)
				.attr('title', tip)
				.css('top', top + '%')
				.css('left', left + '%')
				.hide();

		$('#btns').append(this.ele);

		this.bird = bird;
		this.preAlert = preAlert;
		this.pressed = false;

		this.ele.mouseup(function() {
			if(this.pressed == false) {
				this.press(action());
			}
		}.bind(this));	
	}

	press(time) {
		this.bird.hide();
		this.pressed = true;
		addNotice(this.preAlert);
		this.ele.fadeTo(500, 0.2).delay((time*1000)-1000).fadeTo(500, 1, function() {
			this.bird.show();
			this.pressed = false;
		}.bind(this));
	}

	show() {
		$(this.ele).show();
	}
}

function drawTree(tree) {

	//Trunk
	rect(tree.x, 0, trunkW, HEIGHT, tree.color, tree.barkColor, 4);

	//Branches
	ftx.strokeStyle = tree.color;
	ftx.lineWidth = 8;
	var branches = tree.getBranches();
	for (var i = branches.length - 1; i >= 0; i--) {
		var branch = branches[i];
		ftx.beginPath();
		ftx.moveTo(branch.x, branch.y);
		ftx.lineTo(branch.ex, branch.ey);
		ftx.stroke();


		for (var k = branch.lats.length - 1; k >= 0; k--) {
			lat = branch.lats[k];
			ftx.beginPath();
			ftx.moveTo(lat.x, lat.y);
			ftx.lineTo(lat.ex, lat.ey);
			ftx.stroke();
		}
	}

	_birds = tree.birds;
	for (var i = _birds.length - 1; i >= 0; i--) {
		_birds[i].draw();
	}
}

function drawCanopy() {
	ftx.clearRect(0,0,WIDTH,HEIGHT);
	drawTree(tree);
}

function createCanopy(WIDTH, HEIGHT) {
	tree = new Tree(WIDTH/5, treeCol, barkCol);
	tree.newBranch(400, 400, 0.1);
	tree.getBranches().slice(-1)[0].newLat(100, 50, 1); 
	tree.getBranches().slice(-1)[0].newLat(350, 100, 5.5);

	//tree.newBranch(700, 400, 0.1);

	birb = new Bird(tree.branches[0], 0.5, birdCol) 

	tree.addBird(birb);
	//tree.addBird( new Bird(tree.branches[1], 1.2, birbCol) );
}

function resizeCanvas(canvas) {
   // look up the size the canvas is being displayed
   const width = canvas.clientWidth;
   const height = canvas.clientHeight;

   // If it's resolution does not match change it
   if (canvas.width !== width || canvas.height !== height) {
     canvas.width = width;
     canvas.height = height;
     return true;
   }

   return false;
}

function rect(rx, ry, rw, rh, color, border, borderW) {
	ftx.fillStyle = color;
	ftx.strokeStyle = border;
	ftx.lineWidth = borderW;

	ftx.fillRect(rx, ry, rw, rh);
	ftx.strokeRect(rx, ry, rw, rh);
}

function fadeInBird(bird) {
	var i = 0;

	interval = setInterval(function() {
		drawBird(bird, i);

		i+=0.1;
		if(i >= 1) {
           	clearInterval(interval);
        }
	}, 100);
}

function fadeOutBird(bird) {
	var i = 1;

	interval = setInterval(function() {
		drawBird(bird, i);

		i-=0.2;
		if(i <= 0) {
           	clearInterval(interval);
        }
	}, 100);
}

function getBranchY(branch, dist) {
	return dist*Math.tan(branch.angle);
}

function drawBird(bird, opacity) {

	var branch = bird.getBranch();
	var dist = 150;
	var s = bird.size;

	var bx = branch.x + dist;
	var by = branch.y + getBranchY(branch, dist) - 40*s; 

	btx.strokeStyle = '#ffffff';
	btx.lineWidth = 2;
	btx.clearRect(bx - 30*s, by - 20*s, 70*s, 60*s);

	btx.fillStyle = 'rgba(' + bird.getColor() + ',' + opacity +')';
	btx.strokeStyle = 'rgba(0, 0, 0,' + opacity +')';
	btx.lineWidth=2;

	//beak
	btx.beginPath();
	btx.moveTo(bx + (30*s), by);
	btx.lineTo(bx + (35*s), by-(5*s));
	btx.lineTo(bx + (25*s), by - (10*s));
	btx.stroke();
	btx.fill();

	//body
	btx.beginPath();
		btx.arc(bx - 10*s, by + 5, 20*s, 2*pi, 5/6*pi);
		btx.arc(bx + 15*s, by, 15*s, pi, 2*pi);
		btx.arc(bx, by, 30*s, 2*pi, 5/6*pi);
	btx.fill();
	btx.stroke(); 


	//legs
	btx.beginPath();
		btx.moveTo(bx, by + (30*s));
		btx.lineTo(bx, by + (40*s));
		btx.moveTo(bx + (10*s), by + (30*s));
		btx.lineTo(bx + (10*s), by + (40*s));
	btx.stroke();

	//eye
	btx.beginPath();
		btx.arc(bx + (20*s), by - (6*s), 1, 0, 2*pi);
	btx.stroke();	
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function addNotice(text) {
	var notice = $("<div>" + text +  "</div>");
	notice.hide().prependTo($('#notices')).fadeIn(2000);
}

class Branch {
	constructor(x, y, length, angle) {
		this.x = x;
    	this.y = y;
    	this.length = length;
    	this.angle = angle;

    	this.ex = x + (length * Math.cos(angle)); 
    	this.ey = y + (length * Math.sin(angle)); 

    	this.lats = [];
  	}

  	newLat(dist, length, angle) {
  		this.lats.push(new LatBranch(this.x + dist, getBranchY(this, dist) + this.y, dist, length, angle));
  	}
}

class LatBranch {
	constructor(x, y, dist, length, angle) {
		this.x = x;
		this.y = y;
		this.dist = dist;
		this.length = length;
		this.angle = angle;

		this.ex = x + (length * Math.cos(angle)); 
    	this.ey = y + (length * Math.sin(angle)); 
	}
}

class Tree {
	constructor(x, color, barkColor) {
		this.x = x;
		this.color = color;
		this.barkColor = barkColor;
		this.branches = [];
		this.birds = [];
	}

	newBranch(y, length, angle) {
		this.addBranch(new Branch(this.x + trunkW -50, y, length, angle));
	}

	addBranch(branch) {
		this.branches.push(branch);
	}

	addBird(bird) {
		this.birds.push(bird);
	}

	getBranches() {
		return this.branches;
	}
}

class Bird {
	constructor(branch, size, color) {
		this.branch = branch;
		this.size = size;
		this.bcolor = color;
		this.visable = 1; //0 - Hidden, 1 - To Draw, 2 - Visable, 3 - To Hide
	}

	getBranch() {
		return this.branch;
	}

	getColor() {
		return this.bcolor;
	}

	hide() {
		this.visable = 3;
		this.draw();
	}

	show() {
		this.visable = 1;
		this.draw();
	}

	draw() {
		switch(this.visable) {
    		case 0:
		        break;
		    case 1:
		    	fadeInBird(this);
		    	this.visable = 2;
		        break;
		    case 2:
		    	drawBird(this, 1);
		        break;
		    case 3:
		    	fadeOutBird(this);
		    	this.visable = 0;
		        break;
		    default:
		    	break;
		} 
	}
}

class Basket {
	constructor(type) {
		this.type = type;
	}

	setType(type) {
		this.type = type;
	}
}
