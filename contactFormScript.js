function pad(str) {
	if (str.length === 1) {
		return ("0" + str);
	} else {
		return (str);
	}
}


function makeLink() {
	
	var output = "http://www.3dlasermapping.com/testcontact/?data=" + pad($('#industry').val()) + pad($('#product').val()) + pad($('#type').val());
	$('.panel-body').html(output);
}

