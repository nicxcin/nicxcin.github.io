var Qs = {}; 
var question_n = 0;  

var questionMarkup = jQuery("<div class='question_o'></div><br>");
questionMarkup.append('<textarea id="question" placeholder="Question..." rows="1" cols="50"></textarea><br><textarea id="answer" placeholder="Answer..." rows="2" cols="50"></textarea><br><button id="del_button">Remove Question</button>');


var FAQ_prepend = '[x_raw_content]<ul id="FAQ"><script>jQuery(document).ready(function() {jQuery(".q").on("click", function(e) { jQuery(e.target).toggleClass("green").next().toggle();});});</script><style>.q {margin-top: 15px !important;color: #666666;padding: 8px;background: #EFEFEF;cursor: pointer;cursor: hand;transition: 0.3s; }.a {display: none;padding: 8px;background: white;transition: ease-in;box-shadow: 0 1px 2px rgba(0,0,0,0.2);}.green {background-color: #72BA26;color: white;} #FAQ > li {list-style:none;} #plus-circle {margin-right: 8px;}</style>';

var FAQ_Question_prepend = '<li><div id="q1" class="q">[x_icon type="plus-circle" id="plus-circle"]';

var FAQ_Question_append = '</div><div id="a1" class="a">';

var FAQ_Answer_append = '</div></li>';

var FAQ_append = '</ul>[/x_raw_content]';

function add_question() {
	id = "q"+question_n;
	Qs[id] = new Question(id);
	Qs[id].draw();
	question_n++;

}

function Question(id) {	
	this.id = id;
	this.question = "";
	this.answer = "";
	this.ele = questionMarkup.clone();
	this.ele.attr('id',this.id);

	this.ele.find('#del_button').click(function() {
		Qs[id].remove();
	});

	this.ele.find('#question').on('input propertychange paste', function(e) {
		Qs[id].question = Qs[id].ele.find('#question').val();
	});

	this.ele.find('#answer').on('input propertychange paste', function(e) {
		Qs[id].answer = Qs[id].ele.find('#answer').val();
	});

	//this.ele.find('#question').text(this.title);
	
	this.draw = function() {$('#QuestionArea').append(this.ele);};
	
	this.remove = function() {
		this.ele.remove();
		delete Qs[this.id];
	}	
}
jQuery(document).ready(function() {	
	jQuery('#link_href').on('input propertychange paste', function() {
		jQuery('#link_result').text('<a href="' + jQuery('#link_href').val() +'">' + jQuery('#link_text').val() + '</a>');
	});

	jQuery('#link_text').on('input propertychange paste', function() {
		jQuery('#link_result').text('<a href="' + jQuery('#link_href').val() +'">' + jQuery('#link_text').val() + '</a>');
	});
});


var out_text ='';

function create() {

	out_text = FAQ_prepend;

	for(q in Qs) {
		out_text += FAQ_Question_prepend;
		out_text += Qs[q].question;
		out_text += FAQ_Question_append;
		out_text += Qs[q].answer;
		out_text += FAQ_Answer_append;
	}

	out_text += FAQ_append;

	$('#out_text').show();

	$('#out_text').text(out_text);
}