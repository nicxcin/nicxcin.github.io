function pad(str){
	if (str.length == 1) {
		return("0" + str)
	}else{
		return(str)
	}
}


function makeLink() {
	
	console.log( pad($('#industry').val()) + pad($('#product').val()) + pad($('#type').val()) )
}

