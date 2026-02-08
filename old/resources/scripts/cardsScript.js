/*jslint browser: true*/
/*global $, jQuery, alert*/

var cardsMade = 0;
var suits = ['&diams;', '&clubs;', '&hearts;', '&spades;'];

var numSym = [
{
1:"&diams;",
2:"&diams;\n\n\n\n\n\n&diams;",
3:"&diams;\n\n\n&diams;\n\n\n&diams;",
4:"&diams;    &diams;\n\n\n\n\n\n&diams;    &diams;",
5:"&diams;    &diams;\n\n\n   &diams;\n\n\n&diams;    &diams;",
6:"&diams;    &diams;\n\n\n&diams;    &diams;\n\n\n&diams;    &diams;",
7:"&diams;    &diams;\n\n\n&diams; &diams; &diams;\n\n\n&diams;    &diams;",
8:"&diams;    &diams;\n\n&diams;    &diams;\n\n&diams;    &diams;\n\n&diams;    &diams;",
9:"&diams;    &diams;\n\n&diams;    &diams;\n   &diams;\n&diams;    &diams;\n\n&diams;    &diams;",
10:"&diams;    &diams;\n   &diams;\n&diams;    &diams;\n\n&diams;    &diams;\n   &diams;\n&diams;    &diams;",
11:"  &#x265D;\n\nJack",
12:"    &#x265B;\n\nQueen",
13:"  &#x265A;\n\nKing"},
	
{
1:"&clubs;",
2:"&clubs;\n\n\n\n\n\n&clubs;",
3:"&clubs;\n\n\n&clubs;\n\n\n&clubs;",
4:"&clubs;    &clubs;\n\n\n\n\n\n&clubs;    &clubs;",
5:"&clubs;    &clubs;\n\n\n   &clubs;\n\n\n&clubs;    &clubs;",
6:"&clubs;    &clubs;\n\n\n&clubs;    &clubs;\n\n\n&clubs;    &clubs;",
7:"&clubs;    &clubs;\n\n\n&clubs; &clubs; &clubs;\n\n\n&clubs;    &clubs;",
8:"&clubs;    &clubs;\n\n&clubs;    &clubs;\n\n&clubs;    &clubs;\n\n&clubs;    &clubs;",
9:"&clubs;    &clubs;\n\n&clubs;    &clubs;\n   &clubs;\n&clubs;    &clubs;\n\n&clubs;    &clubs;",
10:"&clubs;    &clubs;\n   &clubs;\n&clubs;    &clubs;\n\n&clubs;    &clubs;\n   &clubs;\n&clubs;    &clubs;",
11:"  &#x265D;\n\nJack",
12:"    &#x265B;\n\nQueen",
13:"  &#x265A;\n\nKing"},
			 
{
1:"&hearts;",
2:"&hearts;\n\n\n\n\n\n&hearts;",
3:"&hearts;\n\n\n&hearts;\n\n\n&hearts;",
4:"&hearts;    &hearts;\n\n\n\n\n\n&hearts;    &hearts;",
5:"&hearts;    &hearts;\n\n\n   &hearts;\n\n\n&hearts;    &hearts;",
6:"&hearts;    &hearts;\n\n\n&hearts;    &hearts;\n\n\n&hearts;    &hearts;",
7:"&hearts;    &hearts;\n\n\n&hearts; &hearts; &hearts;\n\n\n&hearts;    &hearts;",
8:"&hearts;    &hearts;\n\n&hearts;    &hearts;\n\n&hearts;    &hearts;\n\n&hearts;    &hearts;",
9:"&hearts;    &hearts;\n\n&hearts;    &hearts;\n   &hearts;\n&hearts;    &hearts;\n\n&hearts;    &hearts;",
10:"&hearts;    &hearts;\n   &hearts;\n&hearts;    &hearts;\n\n&hearts;    &hearts;\n   &hearts;\n&hearts;    &hearts;",
11:"  &#x265D;\n\nJack",
12:"    &#x265B;\n\nQueen",
13:"  &#x265A;\n\nKing"},
	
{
1:"&spades;",
2:"&spades;\n\n\n\n\n\n&spades;",
3:"&spades;\n\n\n&spades;\n\n\n&spades;",
4:"&spades;    &spades;\n\n\n\n\n\n&spades;    &spades;",
5:"&spades;    &spades;\n\n\n   &spades;\n\n\n&spades;    &spades;",
6:"&spades;    &spades;\n\n\n&spades;    &spades;\n\n\n&spades;    &spades;",
7:"&spades;    &spades;\n\n\n&spades; &spades; &spades;\n\n\n&spades;    &spades;",
8:"&spades;    &spades;\n\n&spades;    &spades;\n\n&spades;    &spades;\n\n&spades;    &spades;",
9:"&spades;    &spades;\n\n&spades;    &spades;\n   &spades;\n&spades;    &spades;\n\n&spades;    &spades;",
10:"&spades;    &spades;\n   &spades;\n&spades;    &spades;\n\n&spades;    &spades;\n   &spades;\n&spades;    &spades;",
11:"  &#x265D;\n\nJack",
12:"    &#x265B;\n\nQueen",
13:"  &#x265A;\n\nKing"},
]



function addCard(suit, value) {
	var newCard = document.createElement('div');
	var tl = document.createElement('div');
	var tls = document.createElement('div');
	var center = document.createElement('div');
	var symbols = document.createElement('span');
	
	tl.classList.add("corner", "tl");
	newCard.className = "card";
	newCard.classList.add("card", suit);
	newCard.id = cardsMade.toString();
	cardsMade += 1;
	tl.innerHTML += '' + value;
	tls.classList.add("corner", "tl", "s");
	tls.innerHTML = suits[suit];
	center.className = "center";
	symbols.className = "symbols";
	symbols.innerHTML = numSym[suit][value]
	
	center.appendChild(symbols);
	newCard.appendChild(tl);
	newCard.appendChild(tls);
	newCard.appendChild(center);
	document.getElementById('table').appendChild(newCard);
}


$(document).ready(function () {
	for x 	
});
