var storage = {

	visable: false,

	S : {
			twigs: 		{name:'Twigs', value:0},
			leaves: 	{name:'Leaves', value:0},
		},

	init: function() {
		$('#info').hide();
	},

	add: function(type, amount) {
		if(!storage.visable) {
			storage.show();
		}

		storage.S[type]['value'] += amount;
		engine.updateCounters();
	},

	show: function() {
		$('#info').show();
	}
};