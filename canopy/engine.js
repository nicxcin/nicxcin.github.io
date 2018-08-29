var engine = {

	init: function() {

	},


	update: function() {
		updateBirds();
		updateCounters();
	},


	updateBirds: function() {

	},

	updateCounters: function() {

		for (var key in storage.S) {
			if($('#' + key + 'Row').length != 0) {
				$('#' + key + 'Val').text(storage.S[key]['value']);
			} else {
				engine.createCounter(key);
			}
		}
	},

	createCounter: function(key) {
		console.log(storage.S[key]);
		var counter = $(`<tr id="${key}Row"><td>${storage.S[key]['name']}</td><td id="${key}Val" class="value">${storage.S[key]['value']}</td></tr>`);

		$('#values').append(counter);
	}
}