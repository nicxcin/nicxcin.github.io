var boxes = []


document.getElementById("createQ").addEventListener("click", function a() {
	
	var questionText = prompt("Enter Question Text:");
	
	var x = 100;
	var y = 100;
	
	var button_text = new PointText(new Point(x,y));
	button_text.justification = 'center';
	button_text.fillColor = 'grey';
	button_text.content = questionText;
	button_text.fontSize = 15;
	button_text.fontFamily = "RobotoSlab";
	var text_bounds = button_text.getBounds()
	
	var rect = new Rectangle(new Point(x, y), new Size(text_bounds.width+20, text_bounds.height*2));
	rect.center = (x,y+10)
	var button = new Path.Rectangle(rect);
	button.strokeColor = 'black';
});


