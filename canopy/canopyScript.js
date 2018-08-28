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

var ftx;
var btx;

$(function() {
	setCanvas();
	setHtml();
	createBinds();
	drawCanopy();
	startGame();


});

function setupGame() {
	
}

function startGame() {
	addNotice("You land on a branch.");
	setTimeout(() => {addNotice("This is a good branch.")}, 1000);
	setTimeout(() => {addNotice("It's a little cold, maybe a nest would help.")}, 2000);
	setTimeout(() => {$("#twigsA").show()}, 2000);
	
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

function createBinds() {

	$("#twigsA").hide();
	$("#twigsA").click(function() {
		birb.hide();
		$("#twigsA").fadeTo(500, 0.2).delay(5000).fadeTo(500, 1, function() {
			addNotice("You collect 5 twigs off the forest floor");
			birb.show();
		});
	});
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
	tree.newBranch(500, 300, 0.1);
	tree.getBranches().slice(-1)[0].newLat(100, 50, 1); 
	tree.getBranches().slice(-1)[0].newLat(250, 100, 5.5);

	//tree.newBranch(700, 400, 0.1);

	birb = new Bird(tree.branches[0], 1, birdCol) 

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
		console.log(i);
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
	$('#notices').prepend(notice);
	$(notice).hide().delay(1000).fadeIn( 600 );
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

class Storage {
	constructor() {
		this.twigs = 0;
		this.leaves = 0;
	}
}