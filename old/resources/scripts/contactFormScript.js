function pad(str) {
	if (str.length === 1) {
		return ("0" + str);
	} else {
		return (str);
	}
}

function makeLink() {
	
	var o = "http://www.3dlasermapping.com/contact-us/?data=" + pad($('#industry').val()) + pad($('#product').val()) + pad($('#type').val());
	$('.panel-body').html(o);
}

