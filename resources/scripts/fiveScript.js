var Qs = {}; //Questions Main data structure that stores the Questions (and then also the options)
var question_n = 0;  //A pointer to hold give each Question a unique ID
var first_id;

connections = [];

connecting = false;

/* Default markup for the Questions and then options */

var questionMarkup = jQuery("<div class='question'></div>");
questionMarkup.append('<div class="question_w"><div class="mid_bar upper"></div><div id="opt"></div></div>');

var optionMarkup = $("<div class='option o'></div>")
optionMarkup.append('<div class="top_bar o"></div><div class="mid_bar o"><span id="txt_pane"></span><button onclick="start_connection(this)" class="connect mat_button"></button></div>');


function create_question() {	
	if(!connecting){
		title = prompt("Enter Question Title");
		if(title != null && title != "") {
			new Question(title);
		}
	}
}

function Option(pId) {
	this.pId = pId;
	this.id = pId + "o" + Qs[pId].option_n;
	Qs[pId].option_n++;
	Qs[pId].options[this.id] = this;

	this.title = "";
	this.text = "";
	this.ele = optionMarkup.clone();
	this.ele.attr('id',this.id)
	this.ele.find('.top_bar').text(this.title);
	this.connections = [];
	this.connections_n = 0;
	
	Qs[pId].ele.find('#opt').append(this.ele);
	update_option_left(this.ele.outerWidth(), Qs[pId]);
	this.ele.attr('id',this.id);	


	this.setTitle = function(title) {
		this.title = title;
		this.ele.find('.top_bar').text(this.title);
	}

	this.setText = function(text) {
		this.text = text;
		this.ele.find('#txt_pane').text(this.text);
	}

	this.addConnection = function(qid) {
		cid = this.id + "c" + this.connections_n;
		this.connections_n++;
		line = $(document.createElementNS('http://www.w3.org/2000/svg','line'));
		line.attr('id',cid);
		line.attr('class', "connection");
		this.connections.push([this.id, qid, line]);
		$('#allLines').append(line);
		draw_connections();
	}

	this.delete = function() {
		for(connection of this.connections) {
			connection[2][0].remove();
		}

		$('#option_area').css('display','none');
		var w = this.ele.outerWidth();
		update_option_left(w, Qs[pId]);
		Qs[this.pId].options[this.id].ele.remove();
		delete Qs[this.pId].options[this.id]; //Investigate at some point
		draw_connections();
	}
}


function Question(title) {	
	this.id = "q" + question_n;
	question_n++;
	this.dragging = false;
	this.title = title;
	this.ele = questionMarkup.clone();
	this.ele.attr('id',this.id);
	this.ele.find('.mid_bar').text(this.title);
	this.option_n = 0;
	this.options = {};
	this.top = 0;
	this.left = 0;
	
	Qs[this.id] = this;
	$('#main').prepend(this.ele);

	this.updatePos = function(x,y) {
		w = this.ele.width();
		h = this.ele.height();
		this.top = y;
		this.left = x;
		this.ele.css({'top': (y - h/2), 'left': (x + w - w/4)});
	}

	this.delete = function() {
		for(o in this.options) {
			for(connection of this.options[o].connections) {
				connection[2][0].remove();
			} 
		}
		$('#question_area').css('display','none');
		this.ele.remove();
		delete Qs[this.id];
	}

	this.addOption = function() {
		new Option(this.id);
		updateOption(this.id);
	}
}

//saving loading
function load_tree() {
	Ps = JSON.parse($('#outputA').val());

	questions = [];

	for(question in Ps) {
		tmp = new Question(Ps[question]['title']);
		tmp.updatePos(Ps[question]['left'],Ps[question]['top']);
		for(option in Ps[question].options) {
			tmpo = new Option(tmp.id);
			tmpo.setTitle(Ps[question].options[option].title);
			tmpo.setText(Ps[question].options[option].text);

			for(connection in Ps[question].options[option].connections) {
				//tmpo.addConnection(Ps[question].options[option].connections[connection][1]);

			}
		}
	}

	for(question in Qs) {
		for(option in Qs[question].options) {
			for(connection in Ps[question].options[option].connections) {
				Qs[question].options[option].addConnection(Ps[question].options[option].connections[connection][1]); 
			}
		}
	}

	// aoa.addConnection(b.id);
}

function save_tree() {
   	$('#outputA').show();
   	$('#outputA').val(JSON.stringify(Qs));
}


//connections
function start_connection(i) {
	if(!connecting) {

		first_id = i.parentNode.parentNode.id;

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

function end_connection() {
	$('#addQ').removeClass('greyed');
	$('#cancelQ').addClass('hidden');
	$('#mouse').addClass('hidden');
	connecting = false;
}

//side bar selects
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
			Qs[oid.slice(0, 2)].options[oid].ele.find('#txt_pane').text($('#opt_txt').val());
		}
	});
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

//update options in sidebar
function updateOption(id) {
	$('#options_btn').empty();
	for(o in Qs[id].options) {
		$('#options_btn').append('<li onclick="select_option('+"'"+ o+"'" +')">'+ Qs[id].options[o].title +"</li>");
	}
} 

function delete_connection(cid) {
	$('#connection_area').css('display','none');
	$('#question_area').css('display','inherit');
	$('#connection_area').attr('cid', id);

	Qs[cid.slice(0,2)].options[cid.slice(0,4)].connections[cid.slice(-1)][2][0].remove();
	Qs[cid.slice(0,2)].options[cid.slice(0,4)].connections.splice(cid.slice(-1),1);
}

function update_option_left(w, parent) {
	var count = Object.keys(parent.options).length;
	parent.ele.find('#opt').css('left', (count*-w/2)+100 + "px");
	parent.ele.find('#opt').css('width', count*w + "px");
	draw_connections();
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

$(document).ready(function() {	
	$(document).mouseup(function() {
		for(q in Qs) {
			Qs[q].dragging = false;
		}
	});
	
	$('#addOptionButton').on('click', function(){
		Qs[$('#question_area').attr('qid')].addOption();
	});

	$('#deleteQuestionButton').on('click', function(){
		Qs[$('#question_area').attr('qid')].delete();
	});

	$('#deleteOptionButton').on('click', function(){
		Qs[$('#option_area').attr('oid').slice(0,2)].options[$('#option_area').attr('oid')].delete();
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
					Qs[first_id.slice(0,2)].options[first_id].addConnection(second_id);
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

					q.top = dy;
					q.left = dx;
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
 