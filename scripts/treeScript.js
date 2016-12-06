var currentBranch = 0;

/*jslint browser: true*/
/*global $, jQuery, alert*/

		           //   0  1   2   3   4   5   6   7   8   9  10  11  12  13  14   //branch <----¬
var getParantBranch = ["", 0,  1,  1,  2,  2,  4,  4,  0,  8,  8, 10, 10, 12, 12];  //parant for | branch

var getBranchDepth = [0,  1,  2,  4,  3,  4,  4,  4,  1,  4,  2,  4,  3,  4,  4]; //depth of each branch

function prev() {
	var z;
	jQuery('#branch' + (currentBranch)).addClass("hidden");
	currentBranch = getParantBranch[currentBranch];
	jQuery('#branch' + (currentBranch)).removeClass("hidden");
	console.log(currentBranch);
	if (currentBranch === 0) {
		jQuery('#backButton').addClass("hidden");
	}
	
	
	z = ((getBranchDepth[currentBranch]) * 25) + "%";
	jQuery('#questionsP').width(z); //Change status bar
	
}

function next(i) { //i[0] = branch to go to, i[1] = branch came from
	var z;
	currentBranch = i[0];
	jQuery('#branch' + (i[1])).addClass("hidden");
	jQuery('#branch' + (i[0])).removeClass("hidden");
	
	z = ((getBranchDepth[i[0]]) * 25) + "%";
	jQuery('#questionsP').width(z); //Change status bar
	
	console.log(currentBranch)
	if (getBranchDepth[currentBranch] !== 4) {
		jQuery('#backButton').removeClass("hidden");
	} else {
		//jQuery('#backButton').addClass("hidden");
	} 
		
}