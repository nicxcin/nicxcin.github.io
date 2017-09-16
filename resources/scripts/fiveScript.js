var Qs = {}; //Questions Main data structure that stores the Questions (and then also the options)
var question_n = 0;  //A pointer to hold give each Question a unique ID
var first_id;

connections = [];

connecting = false;

/* Default markup for the Questions and then options */

var questionMarkup = jQuery("<div class='question'></div>");
questionMarkup.append('<div class="question_w"><div class="mid_bar upper"></div><div id="opt"></div></div>');

var optionMarkup = $("<div class='option o'></div>")
optionMarkup.append('<div class="top_bar o"></div><div class="mid_bar o"></div><button onclick="start_connection(this)" class="connect mat_button"></button>');


function create_question() {	
/* First Function that gets called to create a new Question 

Purpose: 
Generate a new instance of the Question object with a Unique ID generated 
with a number and the letter q to allow it to be used as a html ID.

It then 'draws' that instance (Not really drawn but DOM is placed for the first (And only time))

Finally it will increment the Unique ID.
*/
	if(!connecting){

		title = prompt("Enter Question Title");
		if(title != null && title != "") {
			id = "q"+question_n;
			Qs[id] = new Question(id, title);
			Qs[id].draw();
			question_n++;
		}
	}
}

function start_connection(i) {
	if(!connecting) {

		first_id = i.parentNode.id;

		leftOffset = $('#main').position().left;
		x1 = $('#'+first_id + ' .connect').offset().left - leftOffset + 5;
		y1 = $('#'+first_id + ' .connect').offset().top + 5;
		
		$('#mouse').attr({'x1':x1, 'y1':y1, 'x2':x1, 'y2':y1});

		$('#mouse').removeClass('hidden');
		$('#addQ').addClass('greyed');
		$('#cancelQ').removeClass('hidden');
		
		connecting = true;
		$('#question_area').css('display','none');
		$('#option_area').css('display','none');
	}
}

function select_option(oid) {
	$('#question_area').css('display','none');
	$('#option_area').css('display','inherit');
	$('#connection_area').css('display','none');
	
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
	title = prompt("Enter Option Title");

	//title was not empty or cancel was not pressed
	if(title != null && title != "") {
		Qs[id].options[oid] = new Option(oid, id, title);
		Qs[id].options[oid].draw();
		updateOption(id);
		Qs[id].option_n++;
	}
}

function select_question(id) {
	$('#option_area').css('display','none');
	$('#connection_area').css('display','none');
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

function select_connection(id) {
	$('#connection_area').css('display','inherit');
	$('#question_area').css('display','none');
	$('#option_area').css('display','none');
	$('#connection_area').attr('cid', id);
}

function delete_connection(cid) {
	console.log(cid);
	Qs[cid.slice(0,2)].options[cid.slice(0,4)].connections[cid.slice(-1)][2][0].remove();
	Qs[cid.slice(0,2)].options[cid.slice(0,4)].connections.splice(cid.slice(-1),1);
}

function updateOption(id) {
	$('#options_btn').empty();
	for(o in Qs[id].options) {
		$('#options_btn').append('<li onclick="select_option('+"'"+ o+"'" +')">'+ Qs[id].options[o].title +"</li>");
	}
} 	

function end_connection() {
	$('#addQ').removeClass('greyed');
	$('#cancelQ').addClass('hidden');
	$('#mouse').addClass('hidden');
	connecting = false;
}

function Option(id, parentId, title) {
	this.parentId = parentId;
	this.id = id;
	this.title = title;

	this.text = "";
	this.ele = optionMarkup.clone();
	this.ele.attr('id',this.id)
	this.ele.find('.top_bar').text(this.title);
	this.connections = [];
	this.connections_n = 0;
	
	this.draw = function() {
		Qs[parentId].ele.find('#opt').append(this.ele);
		update_option_left(this.ele.outerWidth(), Qs[parentId]);
		this.ele.attr('id',this.id);
	};
	
	this.remove = function() {
		Qs[this.parentId].options[this.id].ele.remove();
		delete Qs[this.parentId].options[this.id]; //Investigate at some point
	}	
}

function update_option_left(w, parent) {
	var count = Object.keys(parent.options).length;
	parent.ele.find('#opt').css('left', (count*-w/2)+100 + "px");
	parent.ele.find('#opt').css('width', count*w + "px");
	draw_connections();
}

function Question(id, title) {	
	this.id = id;
	this.dragging = false;
	this.title = title;
	this.ele = questionMarkup.clone();
	this.ele.attr('id',this.id);
	this.ele.find('.mid_bar').text(this.title);
	this.option_n = 0;
	this.options = {};
	
	this.draw = function() {$('#main').prepend(this.ele);};
	
	this.remove = function() {
		this.ele.remove();
		delete Qs[this.id];
	}	
}

function delete_option(oid) {
	//ensure all connections are removed
	for(connection of Qs[oid.slice(0, 2)].options[oid].connections) {
		connection[2][0].remove();
	}

	$('#option_area').css('display','none');
	var w = Qs[oid.slice(0, 2)].options[oid].ele.outerWidth();
	Qs[oid.slice(0, 2)].options[oid].remove();
	update_option_left(w,Qs[oid.slice(0, 2)]);
	console.log(oid);
	draw_connections();
}

function delete_question(id) {
	//ensure that for every option, the connections are removed.
	for(o in Qs[id].options) {
		for(connection of Qs[oid.slice(0, 2)].options[o].connections) {
			connection[2][0].remove();
		} 
	}
	$('#question_area').css('display','none');
	Qs[id].remove();
}

function draw_connections() {
		for (q in Qs) {
			for (o in Qs[q].options) {
				for (connection of Qs[q].options[o].connections) {
					var main_offset = $('#main').position().left;
					x1 = $('#'+ connection[0] + ' .connect').offset().left - main_offset + 10;
					y1 = $('#'+ connection[0] + ' .connect').offset().top + 5;

					x2 = $('#'+ connection[1]).offset().left - main_offset + $('#'+ connection[1]).width()/2;
					y2 = $('#'+ connection[1]).offset().top;

					connection[2].attr({'x1':x1, 'y1':y1, 'x2':x2, 'y2':y2, 'stroke':'#5E5E5E', 'stroke-width':3});
				}
			}
		}
	}


function finalize_connection(first_id, second_id) {
	
	tmp_option = Qs[first_id.slice(0,2)].options[first_id]
	
	tmp_option.connections.push([first_id, second_id, $(document.createElementNS('http://www.w3.org/2000/svg','line'))]);
	draw_connections();
	cid = first_id + 'c' + tmp_option.connections_n;
	tmp_option.connections.slice(-1)[0][2].attr('id',cid);
	tmp_option.connections.slice(-1)[0][2].attr('class', "connection");
	$('#allLines').append(tmp_option.connections.slice(-1)[0][2]);
	tmp_option.connections_n++;
}

$(document).ready(function() {	
	$(document).mouseup(function() {
		for(q in Qs) {
			Qs[q].dragging = false;
		}
	});
	
	
	$(document).mousedown(function(e) {
		if(!connecting) {
			if($(e.target).hasClass('upper')) {
				var id = e.target.parentNode.parentNode.id;
				select_question(id);	
				Qs[id].dragging = true;
			}

			if($(e.target).hasClass('o')) {
				select_option($(e.target).parentsUntil('#opt')[0].id);
			}
			if($(e.target).hasClass('connection')) {
				select_connection(e.target.id);
			}
		} else {
			if($(e.target).hasClass('upper')) {
				var second_id = e.target.parentNode.parentNode.id;

				if(first_id.slice(0,2) == second_id) {
					console.log("You cannot connect to the same Question.");
					end_connection();
				} else {
					console.log("Connection made between: " + first_id + " and " + second_id);
					finalize_connection(first_id, second_id);
					end_connection();
				}
			} 			
		}
	});
 	
						  
	$('#main').mousemove(function(e) {
		leftOffset = $('#main').position().left;
		mx = e.clientX - leftOffset;
		my = e.clientY;

		if(connecting == false) {
			for(q in Qs) {
				q = Qs[q];		
				if(q.dragging == true) {

					w = q.ele.width();
					h = q.ele.height();

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

					q.ele.css({'top': (dy - h/2), 'left': (dx + w - w/4)});
					
					draw_connections();
				}
			}
		} else {	
			x1 = $('#'+first_id + ' .connect').offset().left - leftOffset + 5;
			y1 = $('#'+first_id + ' .connect').offset().top + 5;
			
			$('#mouse').attr({'x1':x1, 'y1':y1, 'x2':mx, 'y2':my});
		}
	});	
	
});
 