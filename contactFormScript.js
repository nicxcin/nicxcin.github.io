function pad(str){
	if (str.length == 1) {
		return("0" + str)
	}else{
		return(str)
	}
}


function makeLink() {
	
	var code = pad($('#industry').val()) + pad($('#product').val()) + pad($('#type').val()) 
	var url  = "http://www.3dlasermapping.com/testcontact/?data="
	var output = url + code
	
	$('.panel-body').html(output)
}

