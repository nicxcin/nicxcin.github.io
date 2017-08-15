var Qs = {}; //Questions Main data structure that stores the Questions (and then also the options)
var question_n = 0;  //A pointer to hold give each Question a unique ID

/* Default markup for the Questions and then options */

var questionMarkup = $("<div class='question'></div>");
questionMarkup.append('<div class="question_w"><div class="mid_bar upper"></div><div id="opt"></div></div>');

var optionMarkup = $("<div class='option'></div>")
optionMarkup.append('<div class="top_bar"></div><div class="mid_bar"></div>');



function create_question() {	
	/* First Function that gets called to create a new Question 

Purpose: 
Generate a new instance of the Question object with a Unique ID generated 
with a number and the letter q to allow it to be used as a html ID.

It then 'draws' that instance (Not really drawn but DOM is placed for the first (And only time))

It will also create a Listener for a mouse press checking to make sure its a legitimate press of the content needed.
This will then trigger the sidebar to show this question and set its dragging prop to true.

Finally it will increment the Unique ID.
*/
	id = "q"+question_n;
	Qs[id] = new Question(id);
	Qs[id].draw();

	Qs[id].ele.mousedown(function(e) {
		if($(e.target).hasClass('upper')) {
			var id = $(this).attr('id')
			select_q(id);	
			Qs[id].dragging = true;
		}
	});
	question_n++;
}


function select_option(oid) {
	$('#question_area').css('display','none');
	$('#option_area').css('display','inherit');
	
	$('#option_area').attr('oid',oid);
	$('#opt_title').val(Qs[oid.slice(0, 2)].options[oid].title);
	$('#opt_txt').val(Qs[oid.slice(0, 2)].options[oid].text);
	
	
	$('#opt_title').on('input propertychange paste', function() {
		if($('#option_area').attr('oid') == oid) {
			Qs[oid.slice(0, 2)].options[oid].title = $('#opt_title').val();
			Qs[oid.slice(0, 2)].options[oid].ele.find('.top_bar').text($('#opt_title').val());
		}
	});
	
	$('#opt_txt').on('input propertychange paste', function() {
		if($('#option_area').attr('oid') == oid) {
			Qs[oid.slice(0, 2)].options[oid].text = $('#opt_txt').val();
			Qs[oid.slice(0, 2)].options[oid].ele.find('.mid_bar').text($('#opt_txt').val());
		}
	});
}

function add_option(id) {
	oid = id + "o" + Qs[id].option_n;
	Qs[id].options[oid] = new Option(oid, id);
	Qs[id].options[oid].draw();
	updateOption(id);
	
	Qs[id].options[oid].ele.mousedown(function(e) {
		select_option($(this)[0].id);	
	});
	Qs[id].option_n++;
}

function select_q(id) {
	$('#option_area').css('display','none');
	$('#question_area').css('display','inherit');
	$('#question_title').val(Qs[id].title);
	$('#question_area').attr('qid',id);
	
	updateOption(id);
	
	$('#question_title').on('input propertychange paste', function() {
		if($('#question_area').attr('qid') == id) {
			Qs[id].title = $('#question_title').val();
			Qs[id].ele.find('.upper').text($('#question_title').val());
		}
	});
}

function updateOption(id) {
	$('#options_btn').empty();
	for(o in Qs[id].options) {
		$('#options_btn').append('<li onclick="select_option('+"'"+ o+"'" +')">'+ Qs[id].options[o].title +"</li>");
	}
} 	

function Option(id, parentId) {
	this.parentId = parentId;
	this.id = id;
	this.title = prompt("Enter Question title");
	this.text = "";
	this.ele = optionMarkup.clone();
	this.ele.attr('id',this.id)
	this.ele.find('.top_bar').text(this.title);
	
	this.draw = function() {
		Qs[parentId].ele.find('#opt').append(this.ele);
		
		
		update_option_left(this.ele.outerWidth(), Qs[parentId]);

		this.ele.attr('id',this.id);
	};
	
	this.remove = function() {
		Qs[this.parentId].options[this.id].ele.remove();
		delete Qs[this.parentId].options[this.id];
	}
	
}

function update_option_left(w, parent) {
	var count = Object.keys(parent.options).length;
	parent.ele.find('#opt').css('left', (count*-w/2)+100 + "px");
	parent.ele.find('#opt').css('width', count*w + "px");
}

function Question(id) {
	this.id = id;
	this.dragging = false;
	this.title = prompt("Enter Question text");
	this.ele = questionMarkup.clone();
	this.ele.attr('id',this.id);
	this.ele.find('.mid_bar').text(this.title);
	this.option_n = 0;
	this.options = {};
	
	this.draw = function() {$('#main').append(this.ele);};
	
	this.remove = function() {
		this.ele.remove();
		delete Qs[this.id];
	}
}



function delete_option(oid) {
	$('#option_area').css('display','none');
	var w = Qs[oid.slice(0, 2)].options[oid].ele.outerWidth();
	Qs[oid.slice(0, 2)].options[oid].remove();
	update_option_left(w,Qs[oid.slice(0, 2)]);
	
}

function delete_question(id) {
	$('#question_area').css('display','none');
	Qs[id].remove();
}


$(document).ready(function() {
	
	$(document).mouseup(function() {
		for(q in Qs) {
			Qs[q].dragging = false;
		}
	});
	
	
	$('#main').mousemove(function(e) {
		for(q in Qs) {
			q = Qs[q];		
			if(q.dragging == true) {
				
				w = q.ele.width();
				h = q.ele.height();
				
				mx = e.clientX - $('#main').position().left;
				my = e.clientY;
				
				if(mx < w/2) {
					dx = w/2;
				} else if(mx + w/2 > $('#main').width()) {
					dx = $('#main').width() - w/2;
				} else {
					dx = mx;
				}
				if((e.pageY - h/2 < 0)) {
					dy = 0 + h/2;
				} else if(my + h/2 > $('#main').height()) {
					dy = $('#main').height() - h/2;
				} else {
					dy = my;
				}
				   
				q.ele.css({'top': (dy - h/2), 'left': (dx + w/2)});
			}
		}
	});	
	
});