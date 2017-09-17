var index = {}
x = 1
back = 0
jQuery('.backButton').hide();

for (x in data) {
		y = data[x].nodeNumber;
		index[y] = parseInt(x);
	}
	
function getBackNode(n) {
	for (y in data) {
		for (x in data[y].options) {
			if (n == data[y].options[x].destination) {
				back = data[y].nodeNumber;
			}
		}
	}
}
	
	
function change(n) {
	if(n>100) {
		link  = 'http://www.3dlasermapping.com' + links[n-101]
		top.window.location.replace(link);
	} else {
		if(n>=2) {jQuery('.backButton').show();}
		getBackNode(n);
		setTo(n);
	}
}

function changeBack(n) {
	if(n==1) {jQuery('.backButton').hide();}
	setTo(n);
	getBackNode(n);
}

function setTo(n){
	$('#title-text').text(data[index[n]]["h2"]);
	
	$('#option-band').empty();
	for(x in data[index[n]]["options"]) { 
		$('#option-band').append('<div class="a' + n + 'b' + x + '" ></div>');
		$('.a' + n + 'b'+ x).append('<h2>' + data[index[n]]["options"][x]["title"] + '</h2>')
		$('.a' + n + 'b'+ x).append('<p>' + data[index[n]]["options"][x]["prompt"] + '</p>')
		$('.a' + n + 'b'+ x).append('<button class="treeButton  btn-3d-light"  onclick="change(' + data[index[n]]["options"][x]["destination"] + ');">' + '   <i class="fa fa-arrow-right" aria-hidden="true"></i></button>');
	}
}

$('.backButton').click(function () {
	changeBack(back)
});