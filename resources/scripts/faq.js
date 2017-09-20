var Qs = {}; 
var question_n = 0;  

var questionMarkup = jQuery("<div class='question_o'></div><br>");
questionMarkup.append('<textarea id="question" placeholder="Question..." rows="1" cols="50"></textarea><br><textarea id="answer" placeholder="Answer..." rows="2" cols="50"></textarea><br><button id="del_button">Remove Question</button>');


var FAQ_prepend = '[x_raw_content]<div id="FAQ">';

var FAQ_Question_prependA = '<input type="radio" name="accordian"id="';

var FAQ_Question_prependB = '"/><div class="nabouter"><label class="radio" for="';

var FAQ_Question_prependC = '"><div class="nabtop"><span>[x_icon type="plus-circle"]</span>';

var FAQ_Question_append = '</div></label><div class="nabtent">';

var FAQ_Answer_append = '.</div></div>';

var FAQ_append = '</div>[/x_raw_content]';

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

var out_text ='';

function create() {

	out_text = FAQ_prepend;

	for(q in Qs) {
		out_text += FAQ_Question_prependA;
		out_text += Qs[q].id;
		out_text += FAQ_Question_prependB;
		out_text += Qs[q].id;
		out_text += FAQ_Question_prependC;
		out_text += Qs[q].question;
		out_text += FAQ_Question_append;
		out_text += Qs[q].answer;
		out_text += FAQ_Answer_append;
	}

	out_text += FAQ_append;

	$('#out_text').show();
	$('#css_text').show();

	$('#out_text').text(out_text);
}