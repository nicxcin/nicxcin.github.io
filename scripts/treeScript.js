var currentBranch = 0;

/*jslint browser: true*/
/*global $, jQuery, alert*/

/*
function nextQuestion(i) {
    oldPos[0] = pos[0];
    oldPos[1] = pos[1];
	pos[0] = i[0];
	pos[1] = i[1] + 1;
    console.log(pos)
	jQuery('#branch' + (i[1])).addClass("hidden"); 
	jQuery('#branch' + (i[1] + 1)).removeClass("hidden");
    
	z = ((i[1]+1)*100/3) + "%";       //set % change for status bar
	jQuery('#questionsP').width(z); //Change status bar
}
*/

		           //   0  1   2   3   4   5   6   7   8   9  10  11  12  13  14   //branch <----¬
var getParantBranch = ["", 0,  1,  1,  2,  2,  4,  4,  0,  8,  8, 10, 10, 12, 12];  //parant for | branch

var getBranchDepth = [0,  1,  2,  4,  3,  4,  4,  4,  1,  4,  2,  4,  3,  4,  4]; //depth of each branch

function prev() {
	jQuery('#branch' + (currentBranch)).addClass("hidden");
	jQuery('#branch' + (getParantBranch[currentBranch])).removeClass("hidden");
	currentBranch = getParantBranch[currentBranch];
	
	z = ((getBranchDepth[currentBranch])*25) + "%";
	console.log(z);
	jQuery('#questionsP').width(z); //Change status bar
}

function next(i) { //i[0] = branch to go to, i[1] = branch came from
	currentBranch = i[0];
	jQuery('#branch' + (i[1])).addClass("hidden");
	jQuery('#branch' + (i[0])).removeClass("hidden");
	
	z = ((getBranchDepth[i[0]])*25) + "%";
	jQuery('#questionsP').width(z); //Change status bar
}